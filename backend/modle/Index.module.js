import sequelize from '../database/db.config.js';
import User from '../modle/UserModle.js';
import Article from '../modle/Articlemodle.js';
import Category from '../modle/Categorymodle.js';
import Comment from '../modle/Commentmodle.js';

// Define one-to-many relationships
User.hasMany(Article, { foreignKey: 'UserID', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'UserID', as: 'user' });

Category.hasMany(Article, { foreignKey: 'CategoryID', as: 'articles' });
Article.belongsTo(Category, { foreignKey: 'CategoryID', as: 'category' });

Article.hasMany(Comment, { foreignKey: 'ArticleID', as: 'comments' });
Comment.belongsTo(Article, { foreignKey: 'ArticleID', as: 'article' });

User.hasMany(Comment, { foreignKey: 'UserID', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'UserID', as: 'user' });

// Define many-to-many relationships
// Article.belongsToMany(User, { through: 'Article', foreignKey: 'ArticleID', otherKey: 'UserID', as: 'Users' });
// User.belongsToMany(Article, { through: 'Article', foreignKey: 'UserID', otherKey: 'ArticleID', as: 'Articles' });

// Article.belongsToMany(Category, { through: 'Article', foreignKey: 'ArticleID', otherKey: 'CategoryID', as: 'Categories' });
// Category.belongsToMany(Article, { through: 'Article', foreignKey: 'CategoryID', otherKey: 'ArticleID', as: 'Articles' });

Article.belongsToMany(User, { through: 'UserArticle',   foreignKey: 'ArticleID',   otherKey: 'UserID',   as: 'Users'});
User.belongsToMany(Article, {   through: 'UserArticle',   foreignKey: 'UserID',   otherKey: 'ArticleID',   as: 'Articles'});

Article.belongsToMany(Category, {   through: 'ArticleCategory',   foreignKey: 'ArticleID',   otherKey: 'CategoryID',   as: 'Categories'});
Category.belongsToMany(Article, {  through: 'ArticleCategory',   foreignKey: 'CategoryID',   otherKey: 'ArticleID',   as: 'Articles'});

// Sync database
sequelize.sync() // `force: true` drops and recreates tables. Use with caution.
  .then(() => {
    console.log("Database and associations created successfully");
  })
  .catch(err => {
    console.error("Error creating database and associations:", err);
  });

export { User, Article, Category, Comment };
