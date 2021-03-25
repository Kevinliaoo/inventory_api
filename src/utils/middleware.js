const auth = require('./auth');

const no_jwt = {
    authorization: -1
}
const no_admin = {
    authorization: 0
}
const is_admin = {
    authorization: 1
}

/**
 * 
 * @param {*} param0 
 * @returns integer
 * -1: Not JWT provided
 * 0: User logged is not an admin user
 * 1: User logged is an admin user
 */
module.exports = async ({ req }) => {
    const jwt = req.headers && req.headers.jwt || ''; 
    if(jwt === '') return no_jwt; 
    try {
        const res = auth.verify(jwt);
        if(res.is_admin === 1) return {
            ...is_admin, 
            loggedUser: res
        }
        else return no_admin
    } catch(e) {
        return no_jwt;
    }
}