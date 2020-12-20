export function getUrlParams(paramName, searchUrl) {
    let value = new URLSearchParams(searchUrl).get(paramName);
    return value ? value : '';
}

export async function uploadImg(ev) {
    const CLOUD_NAME = 'webify',
        PRESET_NAME = 'webify';

    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData = new FormData();

    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', PRESET_NAME);
    const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    });
    return await res.json();
}

export function getIdfromYoutubeUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getRandomId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

export const storageService = {
    save: (key, value) => {
        var str = JSON.stringify(value);
        localStorage.setItem(key, str);
    },

    load: (key, defaultValue) => {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
    }
}

export const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}