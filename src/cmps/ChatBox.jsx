import React from 'react';
import { connect } from 'react-redux';
import socket from '../services/socketService.js';
import MsgPreview from './MsgPreview';
import { getLoggedUser } from '../actions/UserActions';

import { hideChat, displayNotificationBox } from '../actions/GenericActions';

class ChatBox extends React.Component {

    state = {
        msgTxt: '',
        messages: [],
        loggedUser: 'Guest'
    }

    onSubmitMsg = (ev) => {
        ev.preventDefault();
        if (!this.state.msgTxt) return;
        socket.emit('chat msg', this.state.msgTxt);
        this.setState({ msgTxt: '' });
    }

    handleChange = (event) => {
        let fieldName = event.target.name,
            value = event.target.value;
        this.setState({ [fieldName]: value });
    }

    componentDidMount = () => {
        this.initChat();
    }

    initChat = async () => {
        try {
            await this.props.getLoggedUser();
        } catch (err) {
            this.props.displayNotificationBox({ type: 'failure', message: 'Failed to upload image' });
        }

        if (this.props.loggedInUser) {
            const { firstName } = this.props.loggedInUser
            this.setState({ loggedUser: firstName })
        }

        socket.setup();

        socket.emit('chat join', this.state.loggedUser);

        socket.on('chat newMsg', (msg) => {

            this.setState(prevState => ({ messages: [...prevState.messages, msg] }));
        });

        socket.on('chat newJoin', (newUser) => {
            this.setState(prevState => ({ messages: [...prevState.messages, { by: 'System', txt: newUser + ' just joined!' }] }));
        });
    }

    componentWillUnmount() {
        socket.terminate();
    }

    render() {
        const { loggedUser, messages, msgTxt } = this.state
        return (
            <div className="chat-wrapper flex column">
                <span className="close-chat-btn" onClick={ this.props.hideChat }><i className="fas fa-times"></i></span>
                <div className="chat-title">
                    <span>Webichat</span>
                    <small>Guide to explore Webify</small>
                </div>
                <div className="chat-content">
                    <ul className="chat-messages clean-list">
                        { messages.map((message, idx) => <MsgPreview message={ message } loggedUser={ loggedUser } key={ idx } />) }
                    </ul>
                    <div className="chat-notifications text-center"></div>
                </div>

                <form onSubmit={ this.onSubmitMsg } className="chat-inputs flex space-between">
                    <input autoComplete="off" type="text" name="msgTxt" onChange={ this.handleChange } value={ msgTxt } />
                    <button><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => (
    {
        loggedInUser: state.auth.loggedInUser,
        isChatShown: state.modal.isChatShown
    }
);

const mapDispatchToProps = { getLoggedUser, hideChat, displayNotificationBox };
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);

