const service = require('./solicitudes.service');

const controller = {
    aceptadoComiteController: (req) => {
        const data = service.aceptadoComiteService(req);
        return data;
    },
    aceptadoAdministracionController: (req) => {
        const data = service.aceptadoAdministracionService(req);
        return data;
    },
    aceptadoFinalizarController: (req) => {
        const data = service.aceptadoFinalizarService(req);
        return data;
    },
    getAllController: (id,filtros) => {
        const data = service.getAllService(id,filtros);
        return data;
    },
    getOneController: (usuario,solicitante) => {
        const data = service.getOneService(usuario,solicitante);
        return data;
    },
    postController: (req,user) => {
        const data = service.postService(req,user);
        return data;
    },
    putController: (req) => {
        const data = service.putService(req);
        return data;
    },
    deletedController: (req) => {
        const data = service.deletedService(req);
        return data;
    }
};

module.exports = controller;