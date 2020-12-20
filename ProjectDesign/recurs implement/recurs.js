// function createComponent(name, tagName, prefs = {}, children = []) {
//     return {
//         _id: createRandomId(),
//         prefs,
//         tagName,
//         name,
//         children
//     }
// }


let web = {
    settings: {
        templateId: "423jkb4jk23",
        webName: 'Webify',
        createdBy: { username: 'Tal', _id: '543959fsadka' },
        pages: [
            { name: 'home', route: '/' },
            { name: 'about', route: '/about' },
            { name: 'contact', route: '/contact' }
        ]
    },
    rootElement: {
        prefs: {},
        _id: '1',
        tagName: 'div',
        children: [{ cmpId: '2' }]
    },
    cmps: [{
        _id: '2',
        tagName: 'div',
        prefs: { id: "someDiv", className: "container" },
        children: [{ cmpId: 'dsaklfsdajkfh' }, { cmpId: 'safadfdsafsda' }, { cmpId: '2356sdf' }]
    },
    {
        _id: 'dsaklfsdajkfh',
        tagName: 'span',
        prefs: { style: { bgColor: 'red' }, className: "someclass2" },
        children: ['edgar',]
    },
    {
        _id: 'safadfdsafsda',
        tagName: 'span',
        prefs: { style: { bgColor: 'red' }, className: "someclass" },
        children: ['nevo']
    }
        ,
    {
        _id: '2356sdf',
        tagName: 'span',
        prefs: { style: { bgColor: 'red' }, className: "someclass" },
        children: ['nevo']
    }]
}

const compsMap = web.cmps.reduce((acc, cmp, idx) => {
    acc[cmp._id] = { cmp, idx };
    return acc;
}, {});

const createReactElementRec = (webObj) => {
    if (typeof webObj === 'string' || !webObj) return webObj;
    return React.createElement(
        webObj.tagName,
        { ...webObj.prefs, key: webObj._id },
        webObj.children.map(child => typeof child === 'string' ? child : createReactElementRec(compsMap[child.cmpId].cmp))
    );
}