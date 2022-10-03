
const { response  } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res = response) => {

    //console.log(req.body);
    //Le req mando como argumento

    //Desectructurando
    const { name, email,password } = req.body;

    try{
    // Validando Emai
    // Devuelve el usuario con el email
    const usuario = await Usuario.findOne({email: email});

    // Si el usuario existe
    if ( usuario ){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        });
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario( req.body );



    // Hasher la contraeña

    // Generar el Jsonwebtoken

    // Crear usuario de BD Grabar
    await dbUser.save();

    // Generar respuesta
    return res.status(201).json({
        ok: true,
        uid : dbUser.id,
        name,
    });

    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Por favor el administrador'
        });
    }    
}

const loginUsuario = (req, res = response) => {

    //Le req mando como argumento
    const errors = validationResult( req );   

    const {email,password} = req.body;
    //console.log( email,password);

    return res.json({
        ok: true,
        msg:'Login de Usuario /'
    });
}

const revalidarToken = (req, res) => {

    return res.json({
        ok: true,
        msg:'Renew'
    });
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}