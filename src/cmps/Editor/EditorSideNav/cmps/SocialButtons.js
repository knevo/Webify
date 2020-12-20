export default () => ({
    cmpName: 'Socials Share',
    htmlTagName: 'div',
    role: 'section',
    prefs: {
        style: {
            flexDirection: 'row',
            flexGrow: '0',
            justifyContent: 'flex-start'
        }
    },
    children: [
        {
            cmpName: 'Pinterest',
            htmlTagName: 'div',
            role: 'img',
            prefs: {
                className: 'image-wrapper',
                style: {}
            },
            children: [
                {
                    htmlTagName: 'img',
                    role: 'img',
                    prefs: {
                        src: 'https://static.wixstatic.com/media/8f6f59264a094af0b46e9f6c77dff83e.png/v1/fill/w_30,h_30,al_c,q_85,usm_0.66_1.00_0.01/8f6f59264a094af0b46e9f6c77dff83e.webp',
                        alt: 'Image'
                    }
                }
            ]
        },
        {
            cmpName: 'Facebook',
            htmlTagName: 'div',
            role: 'img',
            prefs: {
                className: 'image-wrapper',
                style: {
                    margin: '0 0 0 24px'
                }
            },
            children: [
                {
                    htmlTagName: 'img',
                    role: 'img',
                    prefs: {
                        src: 'https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_30,h_30,al_c,q_85,usm_0.66_1.00_0.01/0fdef751204647a3bbd7eaa2827ed4f9.webp',
                        alt: 'Image'
                    }
                }
            ]
        },
        {
            cmpName: 'Twitter',
            htmlTagName: 'div',
            role: 'img',
            prefs: {
                className: 'image-wrapper',
                style: {
                    margin: '0 0 0 24px'
                }
            },
            children: [
                {
                    htmlTagName: 'img',
                    role: 'img',
                    prefs: {
                        src: 'https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png/v1/fill/w_30,h_30,al_c,q_85,usm_0.66_1.00_0.01/c7d035ba85f6486680c2facedecdcf4d.webp',
                        alt: 'Image'
                    }
                }
            ],
        },
        {
            cmpName: 'Instagram',
            htmlTagName: 'div',
            role: 'img',
            prefs: {
                className: 'image-wrapper',
                style: {
                    margin: '0 0 0 24px'
                }
            },
            children: [
                {
                    htmlTagName: 'img',
                    role: 'img',
                    prefs: {
                        src: 'https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_30,h_30,al_c,q_85,usm_0.66_1.00_0.01/01c3aff52f2a4dffa526d7a9843d46ea.webp',
                        alt: 'Image'
                    }
                }
            ]
        }
    ]
})
