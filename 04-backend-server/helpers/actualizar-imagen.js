const fs = require('fs');

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {
    switch ( tipo ) {
        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if ( !hospital ) {
                return false;
            }

            const pathViejo = `./uploads/hospitales/${ hospital.img }`;

            if ( fs.existsSync( pathViejo ) ) {
                fs.unlinkSync( pathViejo );
            }

            hospital.img = nombreArchivo;
            await hospital.save();

            return true;

        case 'medicos':
            break;

        case 'usuarios':
            break;
    }
}

module.exports = {
    actualizarImagen
}
