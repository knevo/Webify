export default (style = {}, children = []) => {
    return {
        cmpName: 'Footer',
        htmlTagName: 'footer',
        role: 'section',
        prefs: {
            style: {
                backgroundColor: '#DAD9D9',
                padding: '15px',
                flexDirection: 'row'
            }
        },
        children: [
            {
                cmpName: 'Text',
                htmlTagName: 'span',
                role: 'text',
                prefs: {
                    style: {
                        fontSize: '14px',
                        flexGrow: 1,
                        textAlign: 'center'
                    }
                },
                children: ['All rights Reserved']
            }
        ]
    }
}