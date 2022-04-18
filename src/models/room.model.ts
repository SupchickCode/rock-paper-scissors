import sequelize from '../database/sequelize';
import Sequelize from 'sequelize';

const roomModel = sequelize.define('rooms', {
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
    }
}, { timestamps: true });

export default roomModel;