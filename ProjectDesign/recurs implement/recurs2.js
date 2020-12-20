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
        _id: '234322344',
        tagName: 'div',
        children: [
            {
                _id: '234324',
                tagName: 'div',
                prefs: { id: "someDiv", className: "container" },
                children: [
                    {
                        _id: '234322344',
                        tagName: 'span',
                        prefs: { style: { bgColor: 'red' }, className: "someclass" },
                        children: ['nevo']
                    },
                    {
                        _id: '234322dsf344',
                        tagName: 'span',
                        prefs: { style: { bgColor: 'red' }, className: "someclass" },
                        children: [
                            'edgar',
                            {
                                _id: '234322344',
                                tagName: 'span',
                                prefs: { style: { bgColor: 'red' }, className: "someclass" },
                                children: ['nevo']
                            }]
                    }
                ]
            }
        ]
    }
}


const createReactElementRec = (webObj) => {
    if (typeof webObj === 'string') return webObj;
    return React.createElement(
        webObj.tagName,
        { ...webObj.prefs, key: webObj._id },
        Array.isArray(webObj.children) ? webObj.children.map(child => createReactElementRec(child)) : webObj.children
    );
}