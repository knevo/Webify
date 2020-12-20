export default (children = ['Enter some text here....'], style = {}) => ({
    cmpName: 'Text',
    htmlTagName: 'span',
    role: 'text',
    prefs: {
        style: {
            fontSize: '16px',
            flexGrow: '1',
            ...style
        }
    },
    children
});