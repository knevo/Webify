export default () => {
    return {
        cmpName: 'Map',
        htmlTagName: 'div',
        role: 'map',
        prefs: {
            className: 'map-wrapper',
            style: {
                flexGrow: '1',
                maxWidth: '500px',
                minHeight: '300px'
            }
        },
        children: [
            {
                htmlTagName: 'iframe',
                role: 'map',
                prefs: {
                    frameBorder: '0',
                    scrolling: 'n',
                    marginHeight: '0',
                    marginWidth: '0',
                    src: 'https://maps.google.com/maps?q=HaBonim%204&t=&z=15&ie=UTF8&iwloc=&output=embed'
                },
                children: undefined
            }
        ]
    };
};
