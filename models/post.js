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
      // define association here
    }
  }
  post.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    views: DataTypes.STRING,
    count_views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};