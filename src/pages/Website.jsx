import React, { Component } from 'react'
import wapService from '../services/wapService'

export default class Website extends Component {
    state = {
        website: null
    }
    componentDidMount = async () => {
        if (this.props.match.params.id) {
            const website = await wapService.getById(this.props.match.params.id);
            this.setState({ website });
        }

    }
    createReactElementRec = (cmpData) => {
        const cmps = this.state.website.cmps;
        if (cmpData.role !== 'text' && cmpData.prefs.style &&
            cmpData.prefs.style.flexDirection) cmpData.prefs['data-orientation'] = cmpData.prefs.style.flexDirection;

        return React.createElement(
            cmpData.htmlTagName,
            {
                key: cmpData._id,
                ...cmpData.prefs,
            },
            (Array.isArray(cmpData.children) ?
                [
                    ...cmpData.children.map(child =>
                        child.cmpId ?
                            this.createReactElementRec(cmps[child.cmpId]) :
                            (child.role ? this.createReactElement(child) : child))
                ] : undefined)
        );
    }
    createReactElement = (cmpData) => {
        return React.createElement(
            cmpData.htmlTagName,
            {
                key: 'singleItem',
                ...cmpData.prefs,
            },
            cmpData.children
        );
    }
    render() {
        if (!this.state.website) return <div>Loading...</div>
        return (
            <div className="">
                {this.createReactElementRec(this.state.website.cmps['_rootElement'])}
            </div>
        )
    }
}
