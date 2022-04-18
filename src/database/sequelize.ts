import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";

const sequelize : Sequelize = new Sequelize(databaseConfig);

export default sequelize;