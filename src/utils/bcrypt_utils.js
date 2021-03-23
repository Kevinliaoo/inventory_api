const bcrypt = require('bcrypt');

const encryptPassword = psw => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(psw, 5, (error, hash) => {
            if(error) {
                reject('Error hashing the passowrd');
                return false;  
            }
            resolve(hash); 
        })
    })
}   

const comparePasswords = async (password, hashedPsw) => {
    const result = await bcrypt.compare(password, hashedPsw);
    return result; 
}

module.exports = {
    encryptPassword, 
    comparePasswords,
}