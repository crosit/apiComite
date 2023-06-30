const service = require('./solicitudes.service');

const controller = {
    getAllController: () => {
        const data = service.getAllService();
        return data;
    },
    getOneController: (id) => {
        const data = service.getOneService(id);
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