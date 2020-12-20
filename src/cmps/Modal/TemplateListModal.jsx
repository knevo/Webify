import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions/GenericActions';

import TemplateList from '../../cmps/TemplateList.jsx';
import templateService from '../../services/templateService';
import { Link } from 'react-router-dom';

class TemplateListModal extends React.Component {

    state = {
        templates: null
    }

    componentDidMount = async () => {
        const templates = await templateService.query();
        this.setState({ templates });
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal-template-list-container">
                    <h2 className="modal-template-list-title">Choose a Template</h2>
                    <TemplateList templates={this.state.templates} onSelectTemplate={this.props.hideModal} />
                    <Link onClick={this.props.hideModal} to='/editor' className="mega-button">
                        Build your own Template <i className="fas fa-pencil-ruler"></i></Link>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = { hideModal };
export default connect(undefined, mapDispatchToProps)(TemplateListModal);