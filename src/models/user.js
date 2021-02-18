'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'jdjdhdjdskdachbdsgsuyckjhnhvgbshi';

const {
    Model,
    Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            // define association here
        }

        static async getId(id) {
            return await User.findByPk(id, {})
        }

        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 20
            const offset = query.offset ? parseInt(query.offset) : 0

            let where = {}

            //Filtrar pelo nome
            if (query.name) where.name = {
                [Op.like]: `%${query.name}%`
            }
            if (query.email) where.email = q.query.email

            //Consulta
            const entities = await User.findAndCountAll({
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


        static async verifyLogin(email, password) {
            try {
                let user = await User.findOne({
                    where: {
                        email: email
                    },
                })

                if (!user) {
                    throw new Error('Email nao encontrado.');
                }


                if (!bcrypt.compareSync(password, user.password)) {
                    throw new Error('A senha nao confere.');
                }

                //Recuperar usuario
                let token = jwt.sign({
                    id: user.id
                }, SECRET, {
                    expiresIn: '1d'
                })

                return {
                    user: user,
                    token: token
                }

            } catch (error) {
                throw error
            }
        }

        //Recuperar o token
        static async verifyToken(token) {
            return await jwt.verify(token, SECRET)
        }

        toJSON() {
            const values = Object.assign({}, this.get());
            delete values.password;
            return values;
        }

    };
    User.init({
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
        phone: {
            type: DataTypes.INTEGER,
            validate: {

                isNumeric: {

                    msg: "Telefone: digite caracteres de 1-9"
                },
                len: {
                    args: [9, 9],
                    msg: "Telefone  deve conter 9 caracteres"
                }
            }

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {

                msg: "E-mail informado ja existe no sistema"
            },

            validate: {
                notNull: {
                    msg: " O E-mail dever informado"
                },
                isEmail: {
                    msg: "E-mail val"
                }
            }

        },
        password: {
            type: DataTypes.STRING,
            is: {
                args: ["^[a-z]+$", 'i'],
                msg: "Genero: digite caracteres de A-Z"
            },
            isAlphanumeric: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A senha dever informada"
                }
            }

        },
        level: {
            defaultValue: 0,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'User',

        hooks: {
            beforeSave: (user, options) => {
                try {
                    bcrypt.getRounds(user.password)
                } catch (error) {
                    user.password = bcrypt.hashSync(user.password, 10)
                }
            }
        }
    });
    return User;
};