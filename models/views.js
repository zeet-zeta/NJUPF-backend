'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      views.belongsTo(models.post, { foreignKey: 'postId', as: 'post' });
    }
  }
  views.init({
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    point: DataTypes.INTEGER,
    postId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'views',
  });
  return views;
};