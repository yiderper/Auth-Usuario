
const { response  } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Para encriptar
const { generarJWT } = require('../helpers/jwt');


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

    //hasher la contraeña
    const salt = bcrypt.genSaltSync(10); //Crea la contraseña con 10 vueltas
    dbUser.password = bcrypt.hashSync( password, salt );

    // Generar el Jsonwebtoken
    const token = await generarJWT(dbUser.id, name);   

    // Crear usuario de BD Grabar
    await dbUser.save();

    // Generar respuesta
    return res.status(201).json({
        ok: true,
        uid : dbUser.id,
        name,
        token
    });

    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Por favor el administrador'
        });
    }    
}

const loginUsuario = async(req, res = response) => {

    const {email,password} = req.body;

    try{

        const dbUser = await Usuario.findOne( {email});

        if ( !dbUser ){ // Si no esta el email es incorrecto
           return res.status(400).json({
                ok: false,
                msg : 'El Correo No Existe'
           });
        }

        //Si Existe
        // confirmar si el passarod  hace match
        // compareSync: confirma si la contraseña que esta almacenada
        // es igual a la nueva ingresada
        const validPassword = bcrypt.compareSync( password, dbUser.password )

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }

        // El Usuario y La contraaseña son validos
        // Genearmos el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);   

        //Respues del serviio
        return res.json({
            ok: true,
            uid   : dbUser.id,
            name  : dbUser.name,
            token  
        });

    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
    
}


const revalidarToken = async (req, res = response ) => {
    //Viene desde validar-jwt
    const { uid, name  } = req;

    // Generar el Jsonwebtoken
    const token = await generarJWT(uid, name);   
    

    return res.json({
        ok: true,
        uid,
        name,
        token
        
    });
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}