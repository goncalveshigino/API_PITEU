'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {


        static associate(models) {
            // define association here
        }

        static async getId(id) {
            return await Product.findByPk(id, {})
        }


        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 20
            const offset = query.offset ? parseInt(query.offset) : 0

            let where = {}

            //Filtrar pelo nome
            if (query.name) where.name = {
                [Op.like]: `%${query.name}%`
            }


            //Consulta
            const entities = await Product.findAndCountAll({
                where: where,
                limit: limit,
                offset: offset
            })

            return {
                entities: entities.rows,
                meta: {
                    count: entities.count,
                    limit: limit,
                    offset: offset
                }
            }
        }

    };
    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/],
                    msg: "O nome de conter apenas caracteres de A-Z"
                },
                len: {
                    args: [6, 20],
                    msg: "Nome: Minimo deve conter 6 caracteres"
                },
                contains: {
                    args: ' ',
                    msg: "Nome: deve conter espaco"
                },

                notNull: {
                    msg: "Nome: deve ser informado"
                }
            }
        },
        image: DataTypes.STRING,
        idCategory: DataTypes.INTEGER,
        value: DataTypes.INTEGER,
        nome_url: DataTypes.STRING,
        description: DataTypes.STRING,
        longDescription: DataTypes.STRING,
        combo: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};