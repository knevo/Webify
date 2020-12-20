class Template {
    constructor(formData, requestData) {
        const { fullName, email, phone, subject, content } = formData;
        this.wapId = requestData.params.id;
        this.fullName = fullName || 'N/A';
        this.email = email || 'N/A';
        this.phone = phone || 'N/A';
        this.subject = subject || 'N/A';
        this.content = content || 'N/A';
    }
}

module.exports = Template;