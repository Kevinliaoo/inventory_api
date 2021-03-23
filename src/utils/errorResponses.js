module.exports = {
    notFound: _id => ({
        // Error when searching a specific Product
        error: new Error(`Could not find Product ${_id}`),
        results: null,
    }),
    couldNotUpdate: _id => ({
        // Error when can not update a Product
        error: new Error(`Could not update Product ${_id}`), 
        results: null,
    }),
    couldNotGet: {
        // Error when can not get all Products
        error: new Error('Could not get Products'),
        results: null
    }, 
    invalidDataFormat: {
        // Input invalid format
        error: new Error('Invalid data format'), 
        results: null,
    }, 
    errorCreating: {
        // Error when could not create a new Product or User
        error: new Error('Error creating'), 
        results: null,
    },
    couldNotAddInfo: _id => ({
        // Error when could not add info 
        error: new Error('Could not load Product info'), 
        results: null,
    }),
    incorrectDateFormat: {
        error: new Error('Incorrect date format'), 
        results: null
    }, 
    alreadyExists: { 
        error: new Error("ID already registered"), 
        results: null 
    }, 
    userNotFound: username => ({
        error: new Error(`User ${username} not found`), 
        results: null,
    }), 
    userAlreadyExists: username => ({
        error: new Error(`User with username: ${username} already exists!`), 
        results: null,
    }),
    incorrectPassword: {
        error: new Error('Incorrect password'), 
        results: null
    },
    errorAdmins: {
        error: new Error('Error finding admin users'), 
        results: null,
    },
    usersNotFound: {
        error: new Error('Users not found'), 
        results: null,
    }
}