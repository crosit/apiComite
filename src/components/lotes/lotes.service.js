const { getAllRepository, getByIdRepository, postRepository, putRepository, deletedRepository } = require('./lotes.repository');
const service = {
    getAllService: async (filters) => {
        try {
            // Example database query
            let usuarios = await getAllRepository(filters);

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
    getOneService: async (id) => {
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
    postService: async (data) => {
        try {
            // Example database query
            let validacion = await validacionEntrada([data.fecha_inicio, data.fecha_fin]);
            console.log(validacion.length, 'validacion');
            if (validacion.length == 0) {
                let usuarios = await postRepository(data);
    
                return {
                    status: 200,
                    data: usuarios,
                    message: 'Se creo correctamente'
                }
                
            }
            return {
                status: 400,
                data: null,
                message: 'Ya existe un lote en ese rango de fechas'

            }
        } catch (error) {
            console.log(error, 'error');
        }
    },
    putService: async (data,id) => {
        try {
            // Example database query
            let usuarios = await putRepository(data,id);

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