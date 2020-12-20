export default (inputInfo, style = {}) => {
    return {
        cmpName: 'Input',
        htmlTagName: 'span',
        role: 'input',
        prefs: {
            className: 'input-wrapper',
            style: {
                ...style
            }
        },
        children: [
            {
                cmpName: 'Input',
                htmlTagName: inputInfo.tagName || 'input',
                role: 'input',
                prefs: {
                    className: 'input-element',
                    type: inputInfo.type || 'text',
                    required: true,
                    placeholder: inputInfo.placeholder || 'This is a placeholder',
                    name: inputInfo.name
                },
                children: undefined
            }
        ]
    }
}