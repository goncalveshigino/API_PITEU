const User = require("../../models").User

const errorResponse = require("../../responses/error.response")


module.exports = async(req, res, next) => {


    try {

        if (!req.headers['x-access-token']) {
            return errorResponse(res, 400, 'O header [x-access-token] deve ser informado')
        }

        req.body.token = await User.verifyToken(req.headers['x-access-token']);
        req.body.user = parseInt(req.body.token.id);
        const body = req.body.user;
        req.body.user = await User.getId(req.body.userId)
        const Level = body.dataValues.level

        if (!req.body.user) {
            return errorResponse(res, 404, 'Usuario não encontrado')
        }

        if (Level != 1) {

            console.log()
            return errorResponse(res, 401, 'Apenas o gerente do  tem acesso')
        }
        next()

    } catch (error) {
        return errorResponse(res, 500, 'impossivel validar token de accesso!', error)
    }
}