export default () => {
    return {
        cmpName: 'Site Header',
        htmlTagName: 'header',
        role: 'section',
        prefs: {
            style: {
                backgroundImage: 'url(/images/header.jpg)',
                minHeight: '400px',
                padding: '12px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            },
        },
        children: [
            {
                cmpName: 'Section',
                htmlTagName: 'div',
                role: 'section',
                prefs: {
                    style: {
                        padding: '10px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                },
                children: [
                    {
                        cmpName: 'Main text',
                        htmlTagName: 'span',
                        role: 'text',
                        prefs: {
                            style: {
                                fontSize: 80,
                                fontFamily: 'Pacifio',
                                color: '#FFFFFF',
                                textAlign: 'center'
                            },
                        },
                        children: [
                            'Your Brand Comes Here'
                        ]
                    },
                    {
                        cmpName: 'Sub text',
                        htmlTagName: 'span',
                        role: 'text',
                        prefs: {
                            style: {
                                fontSize: 35,
                                fontFamily: 'OpenSans'
                            },
                        },
                        children: [
                            'Enter Your Website Description'
                        ],
                    }
                ]
            }
        ]
    }
}




