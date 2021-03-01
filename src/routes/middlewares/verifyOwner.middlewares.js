const User = require('../../models').User

const errorResponse = require('../../responses/error.response');

module.exports = async(req, res, next) => {

    const userId = parseInt(req.params.userId ? req.params.userId : req.params.id);

    if (userId !== req.body.user.id) {
        return errorResponse(res, 400, 'Voce nao tem permissao para acessar esse recurso.')
    }
    next()
}