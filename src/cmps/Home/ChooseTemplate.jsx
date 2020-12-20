import React from 'react';
import { Link } from 'react-router-dom';
import TemplateListModal from '../Modal/TemplateListModal';
import TemplateList from '../TemplateList';

export default function ChooseTemplate(props) {
    return (
        <section className="light-section" id="templates">
            <div className="container home-templates-selection">
                <h3 className="section-title">Choose your template!</h3>
                <TemplateList templates={ props.templates } />
                <Link to='/templates' className="show-more-templates">Show More</Link>
            </div>
        </section>
    )
}
