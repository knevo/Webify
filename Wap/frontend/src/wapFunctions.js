import React from 'react';
import axios from 'axios';

const Axios = axios.create({
    withCredentials: true
});

const API_PATH = '/api/wap';

export async function query(id) {
    return await Axios.get(`${API_PATH}/${id}`);
}

export function wrapChildlessElements(cmpData) {
    if (cmpData.role === 'text') {
        cmpData.children = [{
            htmlTagName: 'span',
            role: 'text',
            prefs: {},
            children: [...cmpData.children]
        }]
    }
}

export function renderSingleCmp(cmpData) {
    return React.createElement(
        cmpData.htmlTagName,
        {
            key: 'singleItem',
            ...cmpData.prefs,
        },
        cmpData.children
    );
}

export async function submitForm(formData, siteId) {
    return await Axios.post(`${API_PATH}/${siteId}`, formData);
}