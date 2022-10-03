const { response } = require("express");
const { validationResult } = require('express-validator')


const validarCampos = (req, res = response, next) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty()){
        return res.status(400).json({ // Envio un error 400
            ok :  false,
            errors : errors.mapped()
        });
    }

    // Se ejecuta cuando todo esta ok
    next();
}



//Exportando las funciones
module.exports = {
    validarCampos
}