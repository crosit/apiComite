const {getAllRepository,getByIdRepository,postRepositoryUS,putRepository,deletedRepository} = require('./usuariosHasSolicitudes.repository');
const service = {
    getAllService: async() => {
        try {
            // Example database query
            let usuarios = await getAllRepository();
            
            return {
                status: 200,
                data: usuarios,
                message: 'OK'
            }

          } catch (error) {
            console.error('Error getAllService usuarios:', error);
            return {
                status: 500,
                data: null,
                message: 'error en el servidor register'
            }
           
          }
    },
    getOneService: async(id) => {
        try {
            // Example database query
            let usuarios = await getByIdRepository(id);
            
            return {
                status: 200,
                data: usuarios,
                message: 'OK'
            }

          } catch (error) {
            console.error('Error getAllService usuarios:', error);
            return {
                status: 500,
                data: null,
                message: 'error en el servidor register'
            }
           
          }
    },
    postService: async(data) => {
        try {
            // Example database query
            let usuarios = await postRepositoryUS(data);
            
            return {
                status: 200,
                data: usuarios,
                message: 'Se creo correctamente'
            }} catch (error) {
                console.log(error, 'error'); 
            }
    },
    putService: async(data) => {
        try {
            // Example database query
            let usuarios = await putRepository(data);
           
            return {
                status: 200,
                data: usuarios,
                message: 'Se actualizo correctamente'
            }} catch (error) {
                console.log(error);
            }
    },
    deletedService: async(data) => {
        try {
            // Example database query
            let usuarios = await deletedRepository(data);
            
            return {
                status: 200,
                data: usuarios,
                message: 'Se elimino correctamente'
            }} catch (error) {
                console.log(error);
            }
    },
};



module.exports = service;