import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";

const sequelize : Sequelize = new Sequelize(
    `postgres://${databaseConfig.user}:${databaseConfig.password}@
    ${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`
)

export default sequelize;