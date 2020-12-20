class Template {
    constructor(draftData, loggedUser) {

        const creator = loggedUser ?
            { name: `${loggedUser.firstName} ${loggedUser.lastName}`, _id: loggedUser._id } :
            { name: `Guest`, _id: null };

        const { name, thumbnailUrl, pages } = draftData.settings;

        this.settings = {
            name: name || 'Your Website Name',
            createdBy: creator,
            thumbnailUrl: thumbnailUrl || null,
            pages: pages || []
        }

        this.cmps = draftData.cmps;
    }
}

module.exports = Template;