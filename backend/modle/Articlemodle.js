import { DataTypes } from 'sequelize';
import sequelize from '../database/db.config.js';
// import User from '../modle/UserModle.js'; // Fixed typo
// import Category from '../modle/Categorymodle.js'; // Fixed typo
// import Comment from '../modle/Commentmodle.js'; // Fixed typo

// Define the Article model
export const Article = sequelize.define('Article', {
  ArticleID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',  // Ensure this matches the actual model name (case-sensitive)
      key: 'UserID',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Category',  // Ensure this matches the actual model name (case-sensitive)
      key: 'CategoryID',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  AddImages: {
    type: DataTypes.JSON(DataTypes.STRING), // Array of image paths
    allowNull: true,
    defaultValue: [] // Default to an empty array if no images are provided
},
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Optionally add a default value
  },
}, {
  tableName: 'Article',  // Explicitly specify the table name
  sequelize,
  modelName: 'Article',
});

// Define associations

export default Article;
