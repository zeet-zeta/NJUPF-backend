'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.hasMany(models.views, { foreignKey: 'postId', as: 'comments' });
      // define association here
    }
  }
  post.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};