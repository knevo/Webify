import React from 'react';
import { connect } from 'react-redux';
import { addCmp, removeCmp, updateCmp, moveCmp, cmpToEdit } from '../../actions/EditorActions';

class CmpToolbar extends React.Component {
    onEditCmp = (ev) => {
        this.props.cmpToEdit(this.props.cmpId);
    }

    onRemoveCmp = (ev) => {
        const parentCmpId = ev.target.parentNode.parentNode.parentNode.id;
        this.props.removeCmp(parentCmpId, this.props.cmpId);
    }

    onMoveCmp = (ev) => {
        const diff = ev.target.dataset.diff,
            parentCmpId = ev.target.parentNode.parentNode.parentNode.id;
        this.props.moveCmp(parentCmpId, this.props.cmpId, +diff);
    }

    onCloneCmp = (ev) => {
        const parentId = ev.target.parentNode.parentNode.parentNode.id,
            newCmp = this.props.draft.cmps[this.props.cmpId];
        this.props.addCmp(parentId, newCmp)
    }

    stopProp = (ev) => {
        ev.stopPropagation();
    }

    render() {
        if (this.props.cmpId === '_rootElement') return '';
        return (
            <div className="toolbar" data-role='toolbar' onClick={this.stopProp} >
                <i className="far fa-arrow-alt-circle-up" data-diff='-1' onClick={this.onMoveCmp}></i>
                <i className="far fa-arrow-alt-circle-down" data-diff='1' onClick={this.onMoveCmp}></i>
                <i className="far fa-clone" onClick={this.onCloneCmp}></i>
                <i className="edit fas fa-edit" onClick={this.onEditCmp}></i>
                <i className="remove fas fa-trash-alt" onClick={this.onRemoveCmp}></i>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ draft: state.draft });
const mapDispatchToProps = { addCmp, removeCmp, updateCmp, moveCmp, cmpToEdit };
export default connect(mapStateToProps, mapDispatchToProps)(CmpToolbar);