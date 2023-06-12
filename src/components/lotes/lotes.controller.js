const service = require('./lotes.service');

const controller = {
    getAllController: () => {
        const data = service.getAllService();
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