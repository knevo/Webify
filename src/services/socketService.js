import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3002';
let socket = null;


const setup = () => {
    socket = io(BASE_URL);
}

const terminate = () => {
    socket = null;
}

const on = (eventName, data) => socket.on(eventName, data);
const off = (eventName, data) => socket.off(eventName, data);
const emit = (eventName, data) => socket.emit(eventName, data);
export default { setup, terminate, on, off, emit };
