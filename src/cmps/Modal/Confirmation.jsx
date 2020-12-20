export default class Confirmation extends React.Component {

    onConfirm = () => {
        this.props.onModalClose()
        this.props.transData.onConfirmAction()
    }

    render() {
        return (
            <div className='confirmation-modal flex auto-center'>
                <h4>{this.props.transData.message}</h4>
                <div className="confirmation-modal-btns">
                    <button className="simple-button cancel" onClick={this.props.onModalClose}>
                        {this.props.transData.labels ? this.props.transData.labels.cancel : 'Cancel'}</button>
                    <button className="simple-button confirm" onClick={this.onConfirm}>
                        {this.props.transData.labels ? this.props.transData.labels.confirm : 'Confirm'}</button>
                </div>
            </div>);
    }
}