const Dev = require('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        //buscar devs raio de 10km e filtrar por techs
        //To pegando da query request as informações
        const {latitude, longitude, techs} = request.query;
        //Passo a string de tecs e ele me devolve um array.
        const techsArray = parseStringAsArray(techs);

        //pego a resposta de uma consulta ao DEV. porém dessa vez com filtro.
        const devs = await Dev.find({
            techs: {
                //O $in é um operador lógico de dentro do mongo. (pesquise por mongooperators)
                $in: techsArray,
            }, location: {
                //Existe o operador near que precisa de 2 coisas, o geometry que tem o tipo e as
                //cordenadas, e o maxDistance que é em metros e ele ja retorna o que precisamos.
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    }, 
                    $maxDistance:10000,
                }
            }
        })

        return response.json({devs})
    }
}