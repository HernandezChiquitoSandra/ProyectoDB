const Empresa = require("../models/Empresa");

exports.obtenerEmpresas = async(req,res) =>{
    try {
        const empresas = await Empresa.find();
        res.json(empresas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error!!! :(');
    }
}


