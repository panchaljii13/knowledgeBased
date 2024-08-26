import { DataTypes } from 'sequelize';
import sequelize from '../database/db.config.js';
// import User from './UserModle.js';
// import Article from './Articlemodle.js';
// import { user,Article } from '../modle/Index.module.js'

export const Comment = sequelize.define('Comments', {
  FeedbackID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'UserID',
    },
  },
  ArticleID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Article',
      key: 'ArticleID',
    },
  },
}, {
  tableName: 'Comments',
  sequelize,
  modelName: 'Comments',
});

// Comment.belongsTo(User, { foreignKey: 'UserID', as: 'user' });
// Comment.belongsTo(Article, { foreignKey: 'ArticleID', as: 'article' });

export default Comment;
