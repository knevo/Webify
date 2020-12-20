import React from 'react';

export default class MsgPreview extends React.Component {
    render() {
        const { message } = this.props;
        const msgBy = message.by === this.props.loggedUser ? "user-msg" : ''
        return (
            <li className={msgBy}>
                <div className="flex space-between">
                </div>
                {message.txt}
            </li>)
    }
}
