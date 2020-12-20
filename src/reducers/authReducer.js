let initialState = {
    loggedInUser: null
};

export default function AuthReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, loggedInUser: action.user };

        case 'USER_LOGOUT':
            return { ...state, loggedInUser: null };

        default:
            return state;
    }
}