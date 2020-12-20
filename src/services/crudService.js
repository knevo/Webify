import axios from 'axios';

const Axios = axios.create({
    withCredentials: true
});

export default class crudService {
    API_PATH;
    query = async (filterBy) => {
        let filters = [];

        for (let filterKey in filterBy) {
            if (filterBy[filterKey]) filters.push(filterKey + '=' + filterBy[filterKey]);
        }

        let filterUrlParams = filters.length ? '?' + filters.join('&') : '';
        let result = await Axios.get(this.API_PATH + filterUrlParams);
        return result.data;
    }

    save = (itemData) => {
        return itemData._id ? this._edit(itemData) : this._add(itemData);
    }

    getById = async (itemId) => {
        let result = await Axios.get(`${this.API_PATH}/${itemId}`);
        return result.data;
    }

    deleteById = async (itemId) => {
        let result = await Axios.delete(`${this.API_PATH}/${itemId}`);
        return result.data;
    }

    _add = async (itemData) => {
        let result = await Axios.post(this.API_PATH, itemData);
        return result.data;
    }

    _edit = async (updatedItemData) => {
        let result = await Axios.put(`${this.API_PATH}/${updatedItemData._id}`, updatedItemData);
        return result.data;
    }

    constructor(API_PATH) {
        this.API_PATH = API_PATH;
    }
}