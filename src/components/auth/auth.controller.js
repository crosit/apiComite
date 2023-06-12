const service = require('./auth.service');

const controller = {
    getController: (req) => {
        const data = service.getService(req);
        return data;
    },
    
};

module.exports = controller;