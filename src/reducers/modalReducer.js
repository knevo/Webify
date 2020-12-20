let initialState = {
    notificationBox: null,
    regularModal: null,
    isEditorExpanded: false,
    isLoading: false,
    isExpanderDragged: false,
    isChatShown: false

};

export default function modalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return { ...state, regularModal: action.modalData && { ...action.modalData } }

        case 'TOGGLE_CHAT':
            return { ...state, isChatShown: action.chatData };

        case 'NOTIFICATION_BOX_DISPLAY':
            return { ...state, notificationBox: { ...action.notificationData } };

        case 'NOTIFICATION_BOX_HIDE':
            return { ...state, notificationBox: null };

        case 'TOGGLE_EDITOR_EXPANSION':
            let isExpanded;
            if (action.isExpanded)
                isExpanded = action.isExpanded === 'expand' ? true : false;
            else
                isExpanded = !state.isEditorExpanded;
            return { ...state, isEditorExpanded: isExpanded };

        case 'TOGGLE_LOADER':
            return { ...state, isLoading: !state.isLoading };

        case 'TOGGLE_EXPANDER_DRAGGED':
            return { ...state, isExpanderDragged: !state.isExpanderDragged }

        default:
            return state;
    }
}