const utilService = require('../../services/util.service');

class User {
    constructor({ firstName, lastName, email, password }) {
        if (firstName.length < 2 || firstName.length > 15 || lastName.length < 2 || lastName.length > 15)
            throw new Error('First name and last name must have between 2 and 15 characters.');

        if (!utilService.validateEmail(email))
            throw new Error('Email format is not valid.');

        if (password.length < 6 || password.length > 20)
            throw new Error('Password must have between 6 and 20 characters.');

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isAdmin = false;
        this.imageUrl = null;
        this.createdAt = Date.now();
    }
}

module.exports = User;