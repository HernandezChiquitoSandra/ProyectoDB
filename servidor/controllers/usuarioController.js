const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const {generarJWT}= require('../controllers/helpers/jwt');
const jwt = require('jsonwebtoken');




exports.crearUsuario = async (req, res) => {
  try {
    let usuario;
    
     // Encriptar la contraseña utilizando MD5
     //const contrasenaEncriptada = CryptoJS.MD5(req.body.contrasena).toString();
    //Se crea el usuario
    usuario = new Usuario(req.body);
    contrasena=req.body.contrasena;
    const salt = bcrypt.genSaltSync();
    usuario.contrasena = bcrypt.hashSync( contrasena, salt );

    await usuario.save();

    res.send(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}

exports.obtenerUsuarios = async (req, res) => {

  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}


// Definimos el método para actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    // Extraemos las propiedades del usuario que se van a actualizar desde la solicitud
    const { nombreUsuario, apePaterno, apeMaterno, edad, genero, rol, empresa } = req.body;

    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);

    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    // Actualizamos las propiedades del usuario con los valores recibidos en la solicitud
    usuario.nombreUsuario = nombreUsuario;
    usuario.apePaterno = apePaterno;
    usuario.apeMaterno = apeMaterno;
   // usuario.email = email;
    usuario.edad = edad;
    usuario.genero = genero;
    usuario.rol = rol;
    usuario.empresa = empresa;
    //usuario.contrasena = contrasena;

    // Guardamos los cambios en la base de datos
    await usuario.save();

    // Retornamos el usuario actualizado como respuesta
    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

// Definimos el método para obtener un usuario
exports.obtenerUsuario = async (req, res) => {
  try {
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);

    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    // Retornamos el usuario actualizado como respuesta
    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

// Definimos el método para obtener un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);

    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    await Usuario.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: 'Usuario Eliminado' });

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

exports.eliminarUsuarioLog = async (req, res) => {
  try {
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);

    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    //If para cambiar el status
    if (usuario.status == 1) {
      // Cambiamos la propiedad 'status' a 0 para indicar que el usuario está eliminado de manera lógica
      usuario.status = 0;
    } else {
      //'status' a 1
      usuario.status = 1;
    }


    await usuario.save();

    // Retornamos el usuario actualizado como respuesta
    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

exports.obtenerUsuariosOrdenados = async (req, res) => {
  try {
    const campo = req.query.campo;
    const orden = parseInt(req.query.orden);
    const filtro = req.query.filtro;
    const valor = req.query.valor;
    let usuarios = [];

          if (!(filtro == "null")) {
            usuarios = await Usuario.find({ [filtro]: valor }).sort({ [campo]: orden });
          } else {
            usuarios = await Usuario.find().sort({ [campo]: orden });
          }
          res.json(usuarios);
       
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.login=async (req, res) => {

  const {email, contrasena}= req.body;
   try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok:false,
        msg: 'El email no existe'
      });
    }
    
    //  const contrasenaEncriptada = CryptoJS.MD5(contrasena).toString();

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync( contrasena, usuario.contrasena );

     if (!validPassword) {
       return res.status(400).json({
        ok:false,
        msg:"Contraseña incorrecta"
      });
     }

     //Generar JWT
     const token = await generarJWT(usuario._id, usuario.nomUsuario);

     res.json({
      ok:true,
      _id:usuario._id,
      rol:usuario.rol,
      token
     });
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hubo un problema',
      error
    });
  }
}

exports.verifyToken = function(req, res, next) {
  // Verificar si el token JWT está presente en la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token no proporcionado.' });
  }

  // Verificar la validez del token JWT
  jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Error al autenticar el token.' });
    }

    // Si el token JWT es válido, almacenar el nombre de usuario en la solicitud para su posterior uso
    req.nomUsuario = decoded.nomUsuario;
    next();
  });
};