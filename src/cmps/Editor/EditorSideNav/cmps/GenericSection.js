export default (cmpType, children = [], style = {}) => {
    let cmpInfo = {};

    switch (cmpType) {
        case 'vertical':
            cmpInfo.orientation = 'vertical';
            break;

        case 'header':
            cmpInfo.name = 'Header';
            cmpInfo.tagName = 'header';
            break;

        case 'footer':
            cmpInfo.name = 'Footer';
            cmpInfo.tagName = 'footer';
            break;

        case 'nav':
            cmpInfo.name = 'Navigation Bar';
            cmpInfo.tagName = 'nav';
            break;

        default:
    }

    return {
        cmpName: cmpInfo.name || 'Section',
        htmlTagName: cmpInfo.tagName || 'div',
        role: 'section',
        prefs: {
            style: {
                padding: '12px',
                flexDirection: (cmpInfo.orientation === 'vertical' ? 'column' : 'row'),
                flexGrow: '1',
                ...style
            }
        },
        children
    }
};

