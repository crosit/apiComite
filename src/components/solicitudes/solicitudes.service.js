const { getAllRepository2, getByIdRepository, aceptadoAdministracion, postRepository, aceptadoComite, putRepository, deletedRepository, aceptadoFinalizar } = require('./solicitudes.repository');
const service = {
    getAllService: async (id,filtros) => {
        try {
            // Example database query
            let usuarios = await getAllRepository2(id,filtros);

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
    aceptadoFinalizarService: async (data) => {
        try {
            // Example database query
            let usuarios = await aceptadoFinalizar(data);

            return {
                status: 200,
                data: usuarios,
                message: 'Se acepto correctamente'
            }
        } catch (error) {
            console.log(error);
        }
    },
    aceptadoAdministracionService: async (data) => {
        try {
            // Example database query
            let usuarios = await aceptadoAdministracion(data);

            return {
                status: 200,
                data: usuarios,
                message: 'Se acepto correctamente'
            }
        } catch (error) {
            console.log(error);
        }
    },
    getOneService: async (usuario, solicitante) => {
        try {
            // Example database query
            let usuarios = await getByIdRepository(usuario, solicitante);

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
                message: 'error en el servidor'
            }

        }
    },
    postService: async (data, user) => {
        try {
            // Example database query
            let usuarios = await postRepository(data, user);
            return {
                status: 200,
                data: usuarios,
                message: 'Se creo correctamente'
            }
        } catch (error) {
            console.log(error, 'error');

        }
    },
    aceptadoComiteService: async (data) => {
        try {
            // Example database query
            let usuarios = await aceptadoComite(data);

            return {
                status: 200,
                data: usuarios,
                message: 'Se acepto correctamente'
            }
        } catch (error) {
            console.error('Error getAllService usuarios:', error);
            return {
                status: 500,
                data: null,
                message: 'error en el servidor'
            }
        }
    },
    putService: async (data) => {
        try {
            // Example database query
            let usuarios = await putRepository(data);

            return {
                status: 200,
                data: usuarios,
                message: 'Se actualizo correctamente'
            }
        } catch (error) {
            console.log(error);
        }
    },
    deletedService: async (data) => {
        try {
            // Example database query
            let usuarios = await deletedRepository(data);

            return {
                status: 200,
                data: usuarios,
                message: 'Se elimino correctamente'
            }
        } catch (error) {
            console.log(error);
        }
    },
};



module.exports = service;