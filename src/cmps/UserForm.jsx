import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/GenericActions';

import Login from './Login';
import Signup from './Signup';

import { Avatar, Button, TextField, Link, Grid, Typography } from '@material-ui/core';
import { LockOutlined, PersonAddOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function UserForm(props) {
    const { isLoginForm } = props;
    const classes = useStyles();

    function onFormSubmit(ev) {
        ev.preventDefault()
        const formData = {}

        if (!isLoginForm) {
            const { firstName, lastName } = ev.target
            formData.firstName = firstName.value
            formData.lastName = lastName.value
        }

        const { email, password } = ev.target
        formData.email = email.value;
        formData.password = password.value;
        props.onSubmitForm(formData);
    }

    return (
        <div className={ 'user-auth-form p20 ' + classes.paper }>
            <Avatar className={ classes.avatar }>
                { isLoginForm ? <LockOutlined /> : <PersonAddOutlined /> }
            </Avatar>
            <Typography component="h1" variant="h5">
                { isLoginForm ? 'Login' : 'Sign up' }
            </Typography>
            <form className={ classes.form } onSubmit={ onFormSubmit }>
                <Grid container spacing={ 2 }>
                    { !isLoginForm && [<Grid key='fName' item xs={ 12 } sm={ 6 }>
                        <TextField autoComplete="fname" name="firstName" required
                            fullWidth id="firstName" label="First Name (2-15 Characters)" autoFocus />
                    </Grid>,
                    <Grid key='lName' item xs={ 12 } sm={ 6 }>
                        <TextField required fullWidth id="lastName" label="Last Name (2-15 Characters)"
                            name="lastName" autoComplete="lname" />
                    </Grid>] }
                    <Grid item xs={ 12 }>
                        <TextField required fullWidth id="email" label="Email Address"
                            name="email" autoComplete="email" type="email" />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField required fullWidth name="password" label={ "Password" + (isLoginForm ? '' : ' (6-20 Characters)') }
                            type="password" id="password" autoComplete="current-password" />
                    </Grid>
                </Grid>

                { props.error &&
                    <div className="user-form-errors">
                        { props.error }
                    </div>
                }

                <Button type="submit" fullWidth variant="contained" color="primary"
                    className={ classes.submit }>
                    { isLoginForm ? 'Login' : 'Sign up' }
                </Button>

                <Grid container justify="center">
                    <Grid item>
                        { !isLoginForm ?
                            <Link href="#" onClick={ () => props.showModal({ component: Login }) } variant="body2">Already have an account? Sign in</Link> :
                            <Link href="#" onClick={ () => props.showModal({ component: Signup }) } variant="body2">No account? Sign up</Link>
                        }
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    showModal
};

export default connect(undefined, mapDispatchToProps)(UserForm);