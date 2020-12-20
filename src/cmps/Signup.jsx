import React from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../actions/UserActions';
import { hideModal } from '../actions/GenericActions';

import UserForm from './UserForm';

class Signup extends React.Component {
    state = {
        error: null
    }

    onSubmitForm = async (formData) => {
        try {
            await this.props.registerUser(formData);
            this.props.hideModal();
        }
        catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        return (
            <UserForm onSubmitForm={this.onSubmitForm} isLoginForm={false} error={this.state.error} />
        )
    }
}


const mapStateToProps = (state) => (
    {
        loggedInUser: state.auth.loggedInUser,
    }
);
const mapDispatchToProps = {
    registerUser, hideModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);