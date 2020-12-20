import React from 'react';
import { connect } from 'react-redux';

import { uploadImg, getIdfromYoutubeUrl } from '../../../services/utils';
import { updateCmp } from '../../../actions/EditorActions';
import { toggleLoader, displayNotificationBox } from '../../../actions/GenericActions';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import helpers from './EditPanel/helpers';
import MainSection from './EditPanel/MainSection';
import SizeSection from './EditPanel/SizeSection';
import LayoutSection from './EditPanel/LayoutSection';
import Loader from '../../Loader';
import CmpNameChanger from './EditPanel/Partials/CmpNameChanger';


class EditPanel extends React.Component {
    state = {
        cmp: null,
        currentOpenPanel: 'main-section'
    }

    setCmpData() {
        const { selectedCmpId, cmps } = this.props.draft;
        const editedCmp = cmps[selectedCmpId];

        editedCmp.prefs = editedCmp.prefs.style ? editedCmp.prefs : { ...editedCmp.prefs, style: {} };

        this.setState({
            cmp: editedCmp
        });
    }

    get sectionTitle() {
        return helpers.getSectionTitle(this.state.cmp.role);
    }

    updateInnerTxt = (ev) => {
        const value = ev.target.value;
        this.setState(prevState => ({ cmp: { ...prevState.cmp, children: [value] } }),
            () => this.props.updateCmp(this.state.cmp));
    }

    updateMediaSrc = (src) => {
        const { cmp } = this.state;

        if (helpers.isMediaCmp(cmp.role)) {
            if (cmp.role === 'video') {
                src = `https://www.youtube.com/embed/${getIdfromYoutubeUrl(src)}`
            } else if (cmp.role === 'map') {
                src = `https://maps.google.com/maps?q=${src}&t=&z=15&ie=UTF8&iwloc=&output=embed`
            }

            this.setState(prevState => {
                let cmp = JSON.parse(JSON.stringify(prevState.cmp));
                cmp.children[0].prefs.src = src;
                return { cmp };
            }, () => this.props.updateCmp(this.state.cmp));

        } else {
            this.handleStyleChange('backgroundImage', `url(${src})`);
        }
    }

    updateCmpLink = (ev) => {
        const value = ev.target.value;
        if (value) {
            this.setState(prevState => ({
                cmp: {
                    ...prevState.cmp, prefs:
                        { ...prevState.cmp.prefs, href: value }, htmlTagName: `a`
                }
            }), () => this.props.updateCmp(this.state.cmp));
        } else {
            this.setState(prevState => ({ cmp: { ...prevState.cmp, prefs: { ...prevState.cmp.prefs, href: value }, htmlTagName: `span` } }),
                () => this.props.updateCmp(this.state.cmp));
        }
    }

    handleDatasetChange = (field, newValue) => {
        if (typeof field === 'object') { // field === event
            newValue = field.target.value;
            field = field.target.name;
        }

        this.setState(prevState => ({
            cmp: {
                ...prevState.cmp, prefs: {
                    ...prevState.cmp.prefs,
                    ['data-' + field]: newValue
                }
            }
        }), () => this.props.updateCmp(this.state.cmp));
    }

    handleCmpNameChange = (cmpName) => {
        this.setState(prevState => ({
            cmp: {
                ...prevState.cmp,
                cmpName
            }
        }), () => this.props.updateCmp(this.state.cmp));
    }

    handleStyleChange = (field, newValue) => {
        if (typeof field === 'object') { // field === event
            newValue = field.target.value;
            field = field.target.name;
        }

        if (field === 'placeholder') {
            const newChild = { ...this.state.cmp.children[0] }
            newChild.prefs.placeholder = newValue
            this.setState(prevState => ({ cmp: { ...prevState.cmp, children: [newChild] } })
                , () => this.props.updateCmp(this.state.cmp))
        }

        const currFieldValue = this.state.cmp.prefs.style[field];
        if (((field === 'alignItems' && newValue === 'stretch') ||
            (field === 'justifyContent' && newValue === 'space-between')) &&
            (currFieldValue === newValue || !currFieldValue)) {
            newValue = 'flex-start';
        }
        this.setState(prevState => ({
            cmp: {
                ...prevState.cmp, prefs: {
                    ...prevState.cmp.prefs,
                    style: helpers.removeRedundantStyles({ ...prevState.cmp.prefs.style, [field]: newValue })
                }
            }
        }), () => this.props.updateCmp(this.state.cmp));

        if (field === 'flexDirection') {
            const cmpStyle = this.state.cmp.prefs.style;
            const tempHolder = cmpStyle.alignItems;
            if (cmpStyle.alignItems !== 'stretch' && cmpStyle.alignItems)
                this.handleStyleChange('alignItems', cmpStyle.justifyContent);
            if (cmpStyle.justifyContent !== 'space-between' && cmpStyle.justifyContent)
                this.handleStyleChange('justifyContent', tempHolder);
        }
    }

    onUploadImg = async (ev) => {
        this.props.toggleLoader();

        let imgSrc;
        try {
            imgSrc = await uploadImg(ev);
        } catch (err) {
            this.props.displayNotificationBox({ type: 'failure', message: 'Failed to upload image' });
            imgSrc = '';
        }

        this.props.toggleLoader();

        this.updateMediaSrc(imgSrc.url);
    }

    handlePanelToggle = panel => (event, isExpanded) => {
        this.setState({ currentOpenPanel: isExpanded ? panel : false });
    };

    componentDidMount() {
        this.setCmpData()
    }

    componentDidUpdate(prevProps, prevState) {
        const { cmp } = this.state;
        if ((cmp && this.props.draft.selectedCmpId !== cmp._id) ||
            (this.props.draft.selectedCmpId === cmp._id && prevProps.draft.cmps[cmp._id] !== this.props.draft.cmps[cmp._id])) {
            this.setCmpData();
        }
    }

    render() {
        if (!this.state.cmp) return <Loader />;

        const { currentOpenPanel, cmp } = this.state;

        const cmpRole = cmp.role;

        return (
            <React.Fragment>

                {cmpRole !== '_root' &&
                    <ExpansionPanel expanded={currentOpenPanel === 'element-name'} onChange={this.handlePanelToggle('element-name')}>
                        <ExpansionPanelSummary className='editor-section-title' expandIcon={<ExpandMoreIcon />}>
                            Element Name
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <CmpNameChanger cmp={this.state.cmp} handleCmpNameChange={this.handleCmpNameChange} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>}


                <ExpansionPanel expanded={currentOpenPanel === 'main-section'} onChange={this.handlePanelToggle('main-section')}>
                    <ExpansionPanelSummary className='editor-section-title' expandIcon={<ExpandMoreIcon />}>
                        {this.sectionTitle}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <MainSection cmp={cmp} handleStyleChange={this.handleStyleChange} updateInnerTxt={this.updateInnerTxt}
                            onUploadImg={this.onUploadImg} updateCmpLink={this.updateCmpLink}
                            toggleLoader={this.props.toggleLoader} updateMediaSrc={this.updateMediaSrc} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={currentOpenPanel === 'size-section'} onChange={this.handlePanelToggle('size-section')}>
                    <ExpansionPanelSummary className='editor-section-title' expandIcon={<ExpandMoreIcon />}>
                        Size
                            </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <SizeSection cmp={this.state.cmp} handleStyleChange={this.handleStyleChange}
                            handleDatasetChange={this.handleDatasetChange} />

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={currentOpenPanel === 'layout-section'} onChange={this.handlePanelToggle('layout-section')}>
                    <ExpansionPanelSummary className='editor-section-title' expandIcon={<ExpandMoreIcon />}>
                        Layout
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <LayoutSection cmp={this.state.cmp} handleStyleChange={this.handleStyleChange}
                            onUploadImg={this.onUploadImg} updateMediaSrc={this.updateMediaSrc} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>)
    }
}
const mapStateToProps = (state) => ({ draft: state.draft });
const mapDispatchToProps = { updateCmp, toggleLoader, displayNotificationBox };
export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);