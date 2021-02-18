const Product = require('../models').Product
const Sequelize = require('sequelize')
const Op = Sequelize.Op


const ResoursController = require('./resource.controller')


class ProductsController extends ResoursController {

    constructor() {
        super()
        this.setModel(User)
    }

}

module.exports = new ProductsController;