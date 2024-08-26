import { DataTypes } from 'sequelize';
import sequelize from '../database/db.config.js';
import bcrypt from 'bcryptjs';

// Define the User model
export const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hashedPassword);
    },
  },
}, {
  tableName: 'User',  // Explicitly specify the table name
  sequelize,
  modelName: 'User',
});

// Define a method to check password
// User.hasMany(Article, { foreignKey: 'UserID', as: 'articles' });

User.checkPassword = (originalPassword, hashedPassword) => {
  return bcrypt.compareSync(originalPassword, hashedPassword);
};

export default User;
