import React from 'react';
import { Link } from 'react-router-dom';
import { toggleEditorExpansion } from '../../actions/GenericActions';
import { connect } from 'react-redux';

class TemplatePreview extends React.Component {
    render() {
        const { template } = this.props;
        const { name, thumbnailUrl } = template.settings;
        return (
            <li>
                <Link to={ `/editor/${template._id}` }>
                    <div>{ name }</div>
                    <div className="template-cover">
                        <img src={ thumbnailUrl || '/images/imagena.png' } alt={ name } />
                        <div className="template-buttons">
                            <button onClick={ () => this.props.toggleEditorExpansion('expand') }><i className="far fa-eye"></i>View Demo</button>
                            <button onClick={ () => this.props.toggleEditorExpansion('collapse') }><i className="fas fa-edit"></i>Use Template</button>
                        </div>
                    </div>
                </Link>
            </li>);
    }
}

const mapDispatchToProps = { toggleEditorExpansion };
export default connect(undefined, mapDispatchToProps)(TemplatePreview);