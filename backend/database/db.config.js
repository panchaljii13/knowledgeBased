import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

export default sequelize;