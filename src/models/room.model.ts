import sequelize from '../database/sequelize';
import Sequelize from 'sequelize';

const roomModel = sequelize.define('rooms', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    name: {
        field: 'name',
        type: Sequelize.STRING
    }
}, { timestamps: true });

export default roomModel;