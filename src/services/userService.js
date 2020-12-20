import axios from 'axios';
import crudService from './crudService.js';

const Axios = axios.create({
    withCredentials: true
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/' : 'http://localhost:3002/';

const userCrud = new crudService(BASE_URL + 'api/users');

async function register(userData) {
    let result = await Axios.post(BASE_URL + 'api/auth', userData);
    if (result.data.error) throw new Error(result.data.error);
    return result.data;
}

async function checkCredentials(loginData) {
    let result = await Axios.post(BASE_URL + 'api/auth/login', loginData);
    if (result.data.error) throw new Error(result.data.error);
    return result.data;
}

async function getLoggedInUser() {
    let result = await Axios.get(BASE_URL + 'api/auth');
    return result.data;
}

async function logOut() {
    let result = await Axios.post(BASE_URL + 'api/auth/logout');
    if (result.data.error) throw new Error(result.data.error);
    return result.data;
}

export default {
    ...userCrud,
    checkCredentials,
    register,
    getLoggedInUser,
    logOut
};