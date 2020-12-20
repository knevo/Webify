export default () => {
    return {
        cmpName: 'Navigation Bar',
        htmlTagName: 'nav',
        role: 'nav',
        prefs: {
            style: {
                padding: '10px',
                flexDirection: 'row'
            }
        },
        children: [
            {
                cmpName: 'Brand',
                htmlTagName: 'span',
                role: 'text',
                prefs: {
                    style: {
                        fontSize: 27,
                        alignItems: 'center',
                        letterSpacing: 5,
                        fontFamily: 'Courgette',
                        padding: '10px',
                        fontWeight: 'bold'
                    }
                },
                children: ['Your Brand'],
            },
            {
                cmpName: 'Navigation Links',
                htmlTagName: 'div',
                role: 'section',
                prefs: {
                    style: {
                        padding: '10px',
                        flexDirection: 'row'
                    }
                },
                children: [
                    {
                        cmpName: 'Link',
                        htmlTagName: 'span',
                        role: 'text',
                        prefs: {
                            style: {
                                fontSize: 25,
                                fontFamily: 'OpenSans'
                            }
                        },
                        children: [
                            'Home'
                        ]

                    },
                    {
                        cmpName: 'Link',
                        htmlTagName: 'span',
                        role: 'text',
                        prefs: {
                            style: {
                                fontSize: 25,
                                margin: '0 0 0 50px'
                            },
                        },
                        children: [
                            'Contact'
                        ],
                    },
                    {
                        cmpName: 'Link',
                        htmlTagName: 'span',
                        role: 'text',
                        prefs: {
                            style: {
                                fontSize: 25,
                                margin: '0 0 0 50px'
                            }
                        },
                        children: [
                            'About'
                        ],
                    }]
            }
        ]
    }
}



