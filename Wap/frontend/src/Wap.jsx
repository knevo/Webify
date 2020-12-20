import React from 'react';
import './assets/scss/main.scss';
import Loader from './Loader';
import { query, renderSingleCmp, wrapChildlessElements, submitForm } from './wapFunctions';

export default class Website extends React.Component {

    state = {
        wapData: {}
    }

    componentDidMount() {
        if (this.props.match.params.id) this.loadWebsite();
    }

    loadWebsite = async () => {
        const { id } = this.props.match.params;
        if (id) {
            try {
                let result = await query(id)
                this.setState({ wapData: result.data }, () => { document.title = result.data.settings.name });
            } catch (err) {
            }
        }
    }

    renderCmpsRecursive = (cmpData) => {
        const { cmps } = this.state.wapData;
        cmpData = { ...cmpData };
        wrapChildlessElements(cmpData);
        if (cmpData.role === 'form')
            cmpData.prefs = { ...cmpData.prefs, onSubmit: this.onSubmitForm }
        return React.createElement(
            cmpData.htmlTagName,
            {
                key: cmpData._id,
                'data-role': cmpData.role,
                ...cmpData.prefs,
                id: cmpData._id
            },
            (Array.isArray(cmpData.children) ?
                cmpData.children.map(child =>
                    child.cmpId ?
                        this.renderCmpsRecursive(cmps[child.cmpId]) :
                        (child.role ? renderSingleCmp(child) : child))
                : undefined)
        );
    }
    onSubmitForm = async (ev) => {
        ev.preventDefault()
        let formData = {}
        ev.target.querySelectorAll('span[data-role="input"]').forEach(elSpan => {
            const elInput = elSpan.children[0]
            formData[elInput.name] = elInput.value
            elInput.value = ''
        })
        try {
            await submitForm(formData, this.state.wapData._id)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { wapData } = this.state;
        return wapData && wapData.cmps ?
            this.renderCmpsRecursive(wapData.cmps['_rootElement']) : <Loader />;
    }
}