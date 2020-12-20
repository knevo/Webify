// Dispatchers
export const _displayNotificationBox = (notificationData) => ({ type: 'NOTIFICATION_BOX_DISPLAY', notificationData });
const _hideNotificationBox = () => ({ type: 'NOTIFICATION_BOX_HIDE' });
const _callModal = (modalData) => ({ type: 'TOGGLE_MODAL', modalData });
const _callChat = (chatData) => ({ type: 'TOGGLE_CHAT', chatData });
const _toggleEditorExpansion = (isExpanded) => ({ type: 'TOGGLE_EDITOR_EXPANSION', isExpanded });
const _toggleLoader = () => ({ type: 'TOGGLE_LOADER' });
const _toggleExpanderDragged = () => ({ type: 'TOGGLE_EXPANDER_DRAGGED' });

// THUNKs
export function showModal(modalData) {
    return dispatch => dispatch(_callModal(modalData));
}

export function hideModal() {
    return dispatch => dispatch(_callModal(null));
}

export function showChat(modalData) {
    return dispatch => dispatch(_callChat(true));
}

export function hideChat() {
    return dispatch => dispatch(_callChat(false));
}

export function displayNotificationBox(notificationData) {
    return dispatch => dispatch(_displayNotificationBox(notificationData));
}

export function hideNotificationBox() {
    return dispatch => dispatch(_hideNotificationBox());
}

export function toggleEditorExpansion(isExpanded) {
    return dispatch => dispatch(_toggleEditorExpansion(isExpanded));
}

export function toggleLoader() {
    return dispatch => dispatch(_toggleLoader());
}

export function toggleExpanderDragged() {
    return dispatch => dispatch(_toggleExpanderDragged());
}
