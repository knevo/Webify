import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../actions/UserActions';
import { hideModal } from '../actions/GenericActions';

import UserForm from './UserForm';

class Login extends React.Component {
    state = {
        error: null
    }

    onSubmitForm = async (formData) => {
        try {
            await this.props.loginUser(formData);
            this.props.hideModal();
        }
        catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        return (
            <UserForm onSubmitForm={this.onSubmitForm} isLoginForm={true} error={this.state.error} />
        )
    }
}


const mapStateToProps = (state) => (
    {
        loggedInUser: state.auth.loggedInUser,
    }
);
const mapDispatchToProps = {
    loginUser, hideModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);