const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const generarJWT = (uid, name)=> {

    const payload = { uid, name };

    return new Promise( (resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        }, (err, token) => {
    
            if ( err ) {
                console.log(err);
                reject( err );
            } else {
                //TODO BIEN
                resolve ( token )
            }
        });

    });

} 


module.exports = {
    generarJWT
}    