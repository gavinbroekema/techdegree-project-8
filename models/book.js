'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        msg: "Please enter a title"
      }
    },
    author: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        msg: "Please enter a author"
      }
    },
    genre: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    year: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};