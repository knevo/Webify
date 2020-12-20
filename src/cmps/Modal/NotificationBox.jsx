import React from 'react';
import { connect } from 'react-redux';
import { hideNotificationBox } from '../../actions/GenericActions';

class NotificationBox extends React.Component {
    state = {
        timerOut: null
    }

    setBoxTimer = () => {
        this.setState({ timerOut: setTimeout(this.props.hideNotificationBox, 2700) });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notificationData !== this.props.notificationData && this.state.timerOut) {
            clearTimeout(this.state.timerOut);
            this.setState({ timerOut: null }, this.setBoxTimer)
        }
    }

    componentDidMount() {
        this.setBoxTimer();
    }

    render() {
        if (!this.state.timerOut || !this.props.notificationData.message) return '';
        return (
            <div className={'notification-box ' + this.props.notificationData.type}>
                {this.props.notificationData.message}
            </div>);
    }
}


const mapDispatchToProps = { hideNotificationBox };
export default connect(undefined, mapDispatchToProps)(NotificationBox);