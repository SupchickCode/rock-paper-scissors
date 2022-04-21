import sequelize from '../database/sequelize';
import Sequelize, { Model } from 'sequelize';

const roomModel : any = sequelize.define('rooms', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false
    },

    owner: {
        field: 'owner',
        type: Sequelize.STRING
    },

    invited: {
        field: 'invited',
        type: Sequelize.STRING,
        allowNull: true,
    },

    owner_points: {
        field: 'owner_points',
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    invited_points: {
        field: 'invited_points',
        type: Sequelize.INTEGER,
        allowNull: true,
    },
}, { timestamps: true });

export default roomModel;