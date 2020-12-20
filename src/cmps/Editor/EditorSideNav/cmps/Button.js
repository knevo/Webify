export default (children = ['click me'], style = {}) => ({
    cmpName: 'Button',
    htmlTagName: 'button',
    role: 'button',
    prefs: {
        style: {
            padding: '7px 15px 7px 15px',
            ...style
        }
    },
    children
});