

import React from 'react';
import { connect } from 'react-redux';

function UserThumb(props) {
    return (
        <div className="user-thumb flex auto-center">
            {props.loggedInUser && props.loggedInUser.imageUrl ?
                <img src={props.loggedInUser.imageUrl} alt={props.loggedInUser.firstName} /> :
                <i className="fas fa-user"></i>}
        </div>)
}


const mapStateToProps = (state) => (
    {
        loggedInUser: state.auth.loggedInUser,
    }
);
export default connect(mapStateToProps, undefined)(UserThumb);