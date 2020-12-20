import React from 'react'
import { connect } from 'react-redux';
import { hideModal } from '../../actions/GenericActions';

class RegularModal extends React.Component {
    state = {
        isClosing: false
    }

    onModalClose = () => {
        this.setState(() => {
            setTimeout(() => this.props.hideModal(), 400);
            return { isClosing: true };
        })
    }

    onKeyUp = (event) => {
        if (event.key === 'Escape') this.onModalClose();
    }

    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp);
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    render() {
        const DynamicComponent = this.props.modalData.component;
        return (
            <div className={'modal-wrapper' + (this.state.isClosing ? ' fade-out' : '')} onClick={this.onModalClose}>
                <div className="modal-content" onClick={(event) => event.stopPropagation()}>

                    <button onClick={this.onModalClose} className="dismiss simple-button normal-trans">&times;</button>
                    <DynamicComponent onModalClose={this.onModalClose} transData={this.props.modalData} />
                </div>
            </div>);
    }
}
const mapDispatchToProps = {
    hideModal
};
export default connect(null, mapDispatchToProps)(RegularModal);
