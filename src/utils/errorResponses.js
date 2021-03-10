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
        // Error when could not create a new Product
        error: new Error('Error creating this Product'), 
        results: null,
    },
    couldNotAddInfo: _id => ({
        // Error when could not add info 
        error: new Error('Could not load Product info'), 
        results: null,
    })
}