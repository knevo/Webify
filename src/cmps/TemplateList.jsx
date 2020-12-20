import React from 'react';
import { Link } from 'react-router-dom';

import TemplatePreview from './TemplateList/TemplatePreview';
import Loader from './Loader';

export default class TemplateList extends React.Component {

    get emptyTemplate() {
        return <li>
            <Link to={ `/editor/` }>
                <div>Build your own</div>
                <div className="template-cover blank">
                    {/* <img src={ '/images/blank.jpg' } alt='new' /> */ }
                    <i className="fas fa-plus"></i>
                    <div className="template-buttons">
                        <button onClick={ null }><i className="fas fa-edit"></i>Start</button>
                    </div>
                </div>
            </Link>
        </li>
    }
    render() {
        if (!this.props.templates) return <Loader />;
        return (
            <ul className="template-list clean-list">
                { this.emptyTemplate }
                { this.props.templates.map(template =>
                    <TemplatePreview key={ template._id } template={ template } />) }
            </ul>
        )
    }
}
