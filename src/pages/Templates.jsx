import React, { Component } from 'react'

import templateService from '../services/templateService';
import Loader from '../cmps/Loader'
import TemplateList from '../cmps/TemplateList';

export default class Templates extends Component {
    state = {
        templates: null
    }

    componentDidMount = async () => {
        let templates = await templateService.query();
        this.setState({ templates });
    }

    render() {
        if (!this.state.templates) return <Loader />
        return (
            <div className='templates-container'>
                <div className='template-menu flex column'>
                    <h2>Templates</h2>
                </div>
                <TemplateList templates={ this.state.templates } />
            </div>
        )
    }
}
