import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db.config.js'; 



// class User extends Model {}
// User.define
export const Category = sequelize.define('Category',{
    CategoryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

},  {
  tableName: 'Category',  // Explicitly specify the table name
  sequelize,
  modelName: 'Category',
});

sequelize.sync()
    .then(res => {
        console.log(" Category Table created successfully");
    })
    .catch(err => {
        console.log(err, "Something went wrong in Category model");
    });
export default Category;