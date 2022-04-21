'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rooms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },

            owner: {
                type: Sequelize.STRING
            },

            invited: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            owner_points: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            invited_points: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('rooms');
    }
};