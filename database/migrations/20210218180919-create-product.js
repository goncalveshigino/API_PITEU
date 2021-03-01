'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },

            idCategory: {
                allowNull: false,
                type: Sequelize.INTEGER,
                /* references: {
                     model: 'Categories',
                     key: 'id',
                 },
                 onUpdate: 'CASCADE',
                 onDelete: 'CASCADE',
                 */
            },
            value: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            nome_url: {
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            longDescription: {

                type: Sequelize.STRING
            },

            combo: {

                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};