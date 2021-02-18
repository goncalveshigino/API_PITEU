const sucessResponse = require('../responses/sucess.response')
const errorResponse = require('../responses/error.response')
const invalidResponse = require('../responses/invalid.response')



class ResourceController {

    constructor() {
        this.model = null
    }

    setModel(model) {
        this.model = model
    }

    bindMethod(method) {
        return this[method].bind(this)
    }
    async index(req, res, next) {

        try {

            const { entities, meta } = await this.model.search(req.query)

            return sucessResponse(res, 200, null, entities, meta)

        } catch (error) {
            console.log(error)
            return errorResponse(res, 500, `Nao foi possivel listar entidades de ${this.model.getTableName()}`, error)
        }
    }



    async show(req, res, next) {

        try {
            const entity = await this.model.getId(req.params.id)

            return sucessResponse(res, 200, null, entity)

        } catch (error) {

            console.log(error)

            return errorResponse(res, 500, `Não foi possível recuperar os dados da entidade de ${this.model.getTableName()} pelo Id`, error)
        }

    }


    async store(req, res, next) {
        try {
            const entity = await this.model.create(req.body)
            return sucessResponse(res, 200, `Nova entidade incluida com sucesso em ${this.model.getTableName()}.`, entity)
        } catch (error) {

            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados nao sao validos`)
            }
            console.log(error)
            return errorResponse(res, 500, `Erro ao incluir entidade em ${this.model.getTableName()}`, error)
        }
    }


    async update(req, res, next) {

        try {
            const entityOld = await this.model.findByPk(req.params.id)
            const entityNew = await entityOld.update(req.body)
            return sucessResponse(res, 200, `Entidade atualizada com sucesso em ${this.model.getTableName()}.`, entityNew)
        } catch (error) {
            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados nao sao validos`)
            }
            return errorResponse(res, 500, `Erro ao atualizar entidade em ${this.model.getTableName()}`, error)
        }
    }


    async remove(req, res, next) {
        try {
            const entity = await this.model.getId(req.params.id)
            if (!entity) {
                return errorResponse(res, 404, `Não foi possível recuperar os dados da entidade de ${this.model.getTableName()} pelo Id`, error)
            }
            entity.destroy()
            return sucessResponse(res, 204, `Entidade exluida com sucesso em ${this.model.getTableName()}.`)
        } catch (error) {
            return errorResponse(res, 500, `Não foi possível recuperar os dados da entidade de ${this.model.getTableName()} pelo Id`, error)
        }
    }
}
module.exports = ResourceController