import React from 'react';
import { connect } from 'react-redux';

import { selectCmp, addCmp, updateCmp, updateCmpText } from '../../actions/EditorActions';
import cmpsPrototypes from './EditorSideNav/cmps.js';
import { isLegalPlacement } from '../../services/editorReducerService';
import helpers from './EditorSideNav/EditPanel/helpers'
import { toggleExpanderDragged } from '../../actions/GenericActions';
import CmpToolbar from './CmpToolbar';
import { wrapChildlessElements, addEditorFunctionality, renderSingleCmp, isMyChild } from './renderFunctions';

class WebsiteContainer extends React.Component {
    state = { draggedElId: '', draggedElParentId: '' }

    onSelectCmp = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const cmpId = ev.target.id,
            { cmps } = this.props.draft;

        if (cmpId && cmps[cmpId]) {
            this.props.selectCmp(cmpId);
        }
    }

    resetDrag = () => {
        this.setState({
            draggedElId: '',
            draggedElParentId: ''
        });
    }

    onUpdateInnerText = (ev) => {
        const { innerText, parentNode } = ev.target;
        const cmpData = this.props.draft.cmps[parentNode.id];
        if (cmpData.children[0] !== innerText) this.props.updateCmpText(innerText, cmpData);
    }

    onDrop = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();

        ev.target.classList.remove('dragHoverBottom', 'dragHoverTop');

        if (!ev.target.id || ev.target.id === this.state.draggedElId) return this.resetDrag();

        const cmpType = ev.dataTransfer.getData("text"),
            { draggedElParentId, draggedElId } = this.state;
        if (cmpType === 'expander') {
            this.props.toggleExpanderDragged()
            return;
        }


        let elTarget = !ev.target.id ? ev.target.parentNode : ev.target,
            cmps = this.props.draft.cmps,
            elNewParent = ev.target;

        if (!cmpType && helpers.isSectionCmp(cmps[draggedElId].role) && isMyChild(elTarget, draggedElId))
            return this.resetDrag();

        const rect = elNewParent.getBoundingClientRect();
        let diff, cmpOrientation = helpers.isSectionCmp(cmps[elTarget.id].role) ?
            elTarget.dataset.orientation : elTarget.parentNode.dataset.orientation

        if (cmpOrientation === 'column') {
            const height = ev.clientY - rect.top;
            diff = (height < ((rect.bottom - rect.top) / 2)) ? 0 : 1;
        } else {
            const width = ev.clientX - rect.left;
            diff = (width < ((rect.right - rect.left) / 2)) ? 0 : 1;
        }

        let newCmp = cmpType ? cmpsPrototypes[cmpType]() : cmps[this.state.draggedElId];


        let { id: newParentId } = elNewParent;
        while (newParentId !== '_rootElement' && !isLegalPlacement(cmps, newParentId, newCmp)) {
            elNewParent = elNewParent.parentNode;
            newParentId = elNewParent.id;
        }

        if (this.state.draggedElId === newParentId || !isLegalPlacement(cmps, newParentId, newCmp)) return this.resetDrag();

        cmpType ?
            this.props.addCmp(newParentId, newCmp, elTarget.id, diff) :
            this.props.updateCmp(cmps[draggedElId], draggedElParentId, newParentId, elTarget.id, diff);
    }

    allowDrop = (ev) => {
        ev.preventDefault();
        const { target, clientY, clientX } = ev,
            unDroppableCmpRoles = ['_root', 'toolbar'];
        // allowedDropCmpsRoles = ['section', '_root', 'toolbar', 'nav', 'card'];
        if (target.id === this.state.draggedElId) return;

        if (unDroppableCmpRoles.includes(target.dataset.role) || target.parentNode.dataset.role === 'toolbar'
            || isMyChild(target, this.state.draggedElId)) return

        let elTarget = !ev.target.id ? ev.target.parentNode : ev.target,
            cmps = this.props.draft.cmps
        let rect = elTarget.getBoundingClientRect();
        let diff, cmpOrientation = helpers.isSectionCmp(cmps[elTarget.id].role) ? target.dataset.orientation : target.parentNode.dataset.orientation

        if (cmpOrientation === 'column') {
            const height = clientY - rect.top;
            diff = (height < ((rect.bottom - rect.top) / 2)) ? -1 : 1;
        } else {
            const width = clientX - rect.left;
            diff = (width < ((rect.right - rect.left) / 2)) ? -1 : 1;
        }

        if (diff === -1) {
            elTarget.classList.add('dragHoverTop')
            elTarget.classList.remove('dragHoverBottom')
        } else if (diff === 1) {
            elTarget.classList.add('dragHoverBottom')
            elTarget.classList.remove('dragHoverTop')
        }

    }

    dragOver = (ev) => {
        ev.preventDefault();
        ev.target.classList.remove('dragHoverBottom', 'dragHoverTop');
    }

    dragStart = (ev) => {
        let target = ev.target.contentEditable && !ev.target.id ? ev.target.parentNode : ev.target; // For text dragging

        this.setState({
            draggedElId: target.id,
            draggedElParentId: target.parentNode.id
        })
    }

    renderCmpsRecursive = (cmpData) => {
        const { cmps, selectedCmpId } = this.props.draft;
        cmpData = { ...cmpData };
        wrapChildlessElements(cmpData, this.onUpdateInnerText);
        addEditorFunctionality(cmpData,
            {
                onSelectCmp: this.onSelectCmp, allowDrop: this.allowDrop,
                onDrop: this.onDrop, onDragLeave: this.dragOver, dragStart: this.dragStart
            }, selectedCmpId);

        return React.createElement(
            cmpData.htmlTagName,
            {
                key: cmpData._id,
                'data-role': cmpData.role,
                ...cmpData.prefs,
                id: cmpData._id
            },

            (Array.isArray(cmpData.children) ?
                [
                    <CmpToolbar cmpId={ cmpData._id } key={ cmpData._id + ' toolbar' } />,
                    ...cmpData.children.map(child =>
                        child.cmpId ?
                            this.renderCmpsRecursive(cmps[child.cmpId]) :
                            (child.role ? renderSingleCmp(child) : child))
                ] : undefined)
        );
    }

    componentDidMount() {
        require('../../assets/scss/basics/editorTypography.scss');
    }


    render() {
        const { cmps } = this.props.draft;
        return (
            <div className="web-site-container">
                { this.renderCmpsRecursive(cmps['_rootElement']) }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ draft: state.draft, isExpanderDragged: state.modal.isExpanderDragged });
const mapDispatchToProps = { selectCmp, addCmp, toggleExpanderDragged, updateCmp, updateCmpText };
export default connect(mapStateToProps, mapDispatchToProps)(WebsiteContainer);