export default () => {
    return {
        cmpName: 'Video',
        htmlTagName: 'div',
        role: 'video',
        prefs: {
            className: 'iframe-wrapper',
            style: {
                maxWidth: '800px',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                borderRadius: '10px',
                overflow: 'hidden'
            }
        },
        children: [
            {
                htmlTagName: 'iframe',
                role: 'video',
                prefs: {
                    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                    allowFullScreen: true,
                    src: 'https://www.youtube.com/embed/VvU27gvAK40',
                },
                children: undefined
            }
        ]
    };
};
