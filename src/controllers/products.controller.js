const Product = require('../models').Product
const Sequelize = require('sequelize')
const Op = Sequelize.Op


const ResoursController = require('./resource.controller')


class ProductsController extends ResoursController {

    constructor() {
        super()
        this.setModel(Product)
    }

    async update(req, res, next) {
        if (req.file) {
            req.body.image = req.protocol + '://' + req.headers.host + '/uploads' + req.file.filename
        }
        return await super.update(req, res, next)
    }


    async store(req, res, next) {

        console.log(req)

        if (req.file) {
            req.body.image = req.protocol + '://' + req.headers.host + '/uploads' + req.file.filename
        }
        return await super.store(req, res, next)
    }

}

module.exports = new ProductsController;