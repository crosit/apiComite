const service = require('./auth.service');

const controller = {
    getController: (req) => {
        const data = service.getService(req);
        return data;
    },
    getController2: async (req) => {
        const data = await service.getService2(req);
        let response = {
            status: 200,
            data: data,
            message: 'OK'
        }
        return response;
    }
    
};

module.exports = controller;