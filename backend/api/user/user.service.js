const dbService = require('../../services/database/db.service'),
    dbCrudService = require('../../services/database/dbCrudService'),
    // ObjectId = require('mongodb').ObjectId,
    User = require('./UserModel');

let userDbCrudService = new dbCrudService('users');

async function query(filterBy, requestData) {
    const users = await userDbCrudService.query(filterBy, requestData);
    const usersWithoutPasswords = users.map(user => {
        delete user.password;
        return user;
    });
    return usersWithoutPasswords;
}

async function create(userData, requestData) {
    const newUser = new User(userData);

    let userExists = await userDbCrudService.getOneByField({ email: newUser.email });

    if (userExists) {
        throw new Error('A user with this email already exists');
    }

    let createdUser = await userDbCrudService.create(newUser);
    delete createdUser.password;
    return createdUser;
}

// const getById = async (userId, requestData) => {
//     const collection = await dbService.getCollection('users');
//     try {
//         var item = await collection.aggregate([
//             { $match: { _id: ObjectId(userId) } },
//             { $lookup: { from: 'toys-reviews', localField: '_id', foreignField: 'creator._id', as: 'reviewsCreated' } }
//         ]).toArray();

//         let user = item[0];
//         delete user.password;
//         return user;
//     } catch (err) {
//         console.log(`ERROR: cannot find item ${itemId}`);
//         throw err;
//     }
// };


async function checkCredentials({ email, password }) {
    const collection = await dbService.getCollection('users');
    let user = await collection.findOne({ email, password });
    if (!user) throw new Error('Either there is no user with the given email, or the password doesn\'t match.');
    return user;
}

function verifyCrudAuths(requestData) { // The Credentials needed for authorization
    // return new Promise((resolve, reject) => {
    //     let {loggedUser} = requestData.session;

    //     switch (requestData.method) {
    //         case 'POST':
    //             return loggedUser ? reject() : resolve();
    //         case 'GET':
    //             return loggedUser && (loggedUser.isAdmin || loggedUser._id === requestData.params.id) ? resolve() : reject();
    //         default:
    //             return loggedUser && loggedUser.isAdmin ? resolve() : reject();
    //     }
    // });
    return Promise.resolve();
}

module.exports = {
    ...userDbCrudService,
    query,
    // getById,
    create,
    verifyCrudAuths,
    checkCredentials
};