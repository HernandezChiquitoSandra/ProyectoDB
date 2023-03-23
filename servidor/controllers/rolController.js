const Rol = require("../models/Rol");

exports.obtenerRoles = async(req,res) =>{
    try {
        const roles = await Rol.find();
        res.json(roles);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error!!! :(');
    }
}


