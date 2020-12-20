import React from 'react';
import { connect } from 'react-redux';

import { toggleEditorExpansion } from '../actions/GenericActions';

import RegularModal from './Modal/RegularModal';
import NotificationBox from './Modal/NotificationBox';
import PageLoading from './Modal/PageLoading';
import ChatBox from './ChatBox';

class Modal extends React.Component {
    
    render() {
        const { notificationBox, regularModal, isLoading,isChatShown } = this.props
        return (
            <React.Fragment>
                { notificationBox && <NotificationBox notificationData={ notificationBox } /> }
                { regularModal && <RegularModal modalData={ regularModal } /> }
                { isLoading && <PageLoading /> }
                {isChatShown && <ChatBox/>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => (
    {
        notificationBox: state.modal.notificationBox,
        regularModal: state.modal.regularModal,
        isLoading: state.modal.isLoading,
        isChatShown: state.modal.isChatShown
    }
);
const mapDispatchToProps = { toggleEditorExpansion };
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
