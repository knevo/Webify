export default function draftCreator(prototypeId) {
    return {
        type: 'template',
        settings: {
            name: '',
            thumbnailUrl: '',
        },
        cmps: {
            _rootElement: {
                _id: '_rootElement',
                htmlTagName: 'div',
                role: '_root',
                prefs: {
                    className: 'web-wrapper'
                },
                children: []
            }
        }
    }
}
