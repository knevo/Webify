export default () => {
    return {
        cmpName: 'Image',
        htmlTagName: 'div',
        role: 'img',
        prefs: {
            className: 'image-wrapper'
        },
        children: [
            {
                htmlTagName: 'img',
                role: 'img',
                prefs: {
                    src: '/images/upload-your-image.jpg',
                    alt: 'Image'
                },
                children: undefined
            }
        ]
    };
};