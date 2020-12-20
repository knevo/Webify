import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCmp, cmpToEdit, historyBack, publishWap, saveTemplate } from '../../actions/EditorActions';
import { showModal, toggleLoader } from '../../actions/GenericActions';

import EditPanel from './EditorSideNav/EditPanel';
import ElementsButtons from './EditorSideNav/ElementsButtons';
import SiteMap from './EditorSideNav/SiteMap';
import cmpsPrototypes from './EditorSideNav/cmps.js';
import WebsiteShare from '../Dashboard/WebsiteShare';
import Signup from '../Signup';

class EditorSideNav extends Component {
    componentDidMount() {
        document.onkeydown = this.handleKeyPress;
    }

    componentWillUnmount() {
        document.onkeydown = null
    }

    handleKeyPress = (ev) => {
        var evtobj = window.event ? window.event : ev
        if (evtobj.keyCode === 90 && evtobj.ctrlKey) this.props.historyBack()
    }

    onAddCmp = (ev) => {
        const { selectedCmpId } = this.props.draft;

        const targetCmpId = selectedCmpId,
            cmpType = ev.target.dataset.cmptype;

        const webContainer = document.querySelector('.web-site-container');
        if (selectedCmpId === '_rootElement') webContainer.scrollTo(0, webContainer.scrollHeight);

        this.props.addCmp(targetCmpId, cmpsPrototypes[cmpType]());
    }

    onDragCmp = (ev) => {
        ev.dataTransfer.setData("text", ev.target.dataset.cmptype);
    }

    saveTemplate = async () => {
        if (!this.props.loggedInUser) return this.props.showModal({ component: Signup });
        try {
            this.props.toggleLoader();
            const templateData = await this.props.saveTemplate(this.props.draft);
            this.props.toggleLoader();
            this.moveToEdit(templateData, 'template');

        } catch (err) { }
    }

    publishWap = async () => {
        if (!this.props.loggedInUser) return this.props.showModal({ component: Signup });
        try {
            this.props.toggleLoader();
            const wapData = await this.props.publishWap(this.props.draft);
            this.props.toggleLoader();
            this.props.showModal({ component: WebsiteShare, websiteData: wapData });
            this.moveToEdit(wapData, 'wap');
        } catch (err) { }
    }

    moveToEdit = (draftData, type) => {
        const { _id } = draftData;
        let editPath = type === 'wap' ? _id + '/wap' : _id;
        this.props.history.push(`/editor/${editPath}`);
    }


    toggleActive = (ev) => {
        const clickedTab = ev.target.dataset.name
        this.props.cmpToEdit(undefined, clickedTab)
    }

    isPanelActive(panelName) {
        return this.props.draft.openPanel === panelName;
    }

    render() {
        return (
            <div className="editor-side-nav">
                <div className="top-sidenav-btns">
                    <div data-name='sitemap' className={ `flex column align-center ${this.isPanelActive('sitemap') && `active`}` }
                        onClick={ this.toggleActive }>
                        <i className="fas fa-tree"></i>
                        <h2>Site Tree</h2>
                    </div>
                    <div data-name='add' className={ `flex column align-center ${this.isPanelActive('add') && `active`}` }
                        onClick={ this.toggleActive }>
                        <i className="fas fa-plus"></i>
                        <h2>Elements</h2>
                    </div>

                    <div data-name='edit' className={ `flex column align-center ${this.isPanelActive('edit') ? `active` : ``}` } onClick={ this.toggleActive }>
                        <i className="fas fa-edit"></i>
                        <h2>Edit</h2>
                    </div>
                </div>

                <div className='edit-panel-container'>
                    { this.isPanelActive('sitemap') && <SiteMap /> }
                    { this.isPanelActive('add') && <ElementsButtons dragCmp={ this.onDragCmp } addCmp={ this.onAddCmp } /> }
                    { this.isPanelActive('edit') && <EditPanel /> }
                </div>

                <div className="bottom-sidenav-btns">
                    <button onClick={ this.props.historyBack }><i className="fas fa-undo"></i></button>
                    <button onClick={ this.saveTemplate }><i className="far fa-save"></i></button>
                    <button onClick={ this.publishWap }><i className="fas fa-cloud-upload-alt"></i></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ draft: state.draft, loggedInUser: state.auth.loggedInUser });
const mapDispatchToProps = { addCmp, cmpToEdit, showModal, historyBack, publishWap, saveTemplate, toggleLoader };
export default connect(mapStateToProps, mapDispatchToProps)(EditorSideNav);
