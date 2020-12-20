import crudService from './crudService';

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/' : 'http://localhost:3002/';

const draftsCrud = new crudService(BASE_URL + 'api/templates');

export default {
    ...draftsCrud
};