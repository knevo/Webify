import userService from '../services/userService';
import { _displayNotificationBox } from './GenericActions';

// Dispatchers
const _loginUser = (user) => ({ type: 'USER_LOGIN', user: user });
const _logoutUser = () => ({ type: 'USER_LOGOUT' });

// THUNK
export function getLoggedUser() {
    return async (dispatch) => {
        const user = await userService.getLoggedInUser();
        
        if (user._id) dispatch(_loginUser(user));
    }
}

export function registerUser(loginData) {
    return async (dispatch) => {
        const user = await userService.register(loginData);
        dispatch(_loginUser(user));
        dispatch(_displayNotificationBox({ type: 'success', message: user.firstName + ', Welcome!' }));
    }
}

export function loginUser(loginData) {
    return async (dispatch) => {
        const user = await userService.checkCredentials(loginData);
        dispatch(_loginUser(user));
        dispatch(_displayNotificationBox({ type: 'success', message: user.firstName + ', Welcome back!' }));
    }
}

export function logoutUser() {
    return async (dispatch) => {
        try {
            await userService.logOut();
            dispatch(_logoutUser());
        }
        catch {
            dispatch(_displayNotificationBox({ type: 'failure', message: 'Failed to logout' }));
        }
    }
}