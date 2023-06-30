const service = require('./lotes.service');

const controller = {
    getAllController: (filters) => {
        const data = service.getAllService(filters);
        return data;
    },
    getOneController: (id) => {
        const data = service.getOneService(id);
        return data;
    },
    postController: (req) => {
        const data = service.postService(req);
        return data;
    },
    putController: (req,id) => {
        const data = service.putService(req,id);
        return data;
    },
    deletedController: (req) => {
        const data = service.deletedService(req);
        return data;
    }
};

module.exports = controller;