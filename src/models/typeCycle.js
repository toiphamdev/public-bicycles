'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeCycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeCycle.hasMany(models.Bicycle, {
        foreignKey: 'type',
        as: 'typeData',
      });
    }
  }
  TypeCycle.init(
    {
      name: DataTypes.TEXT,
      image: DataTypes.TEXT,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TypeCycle',
    }
  );
  return TypeCycle;
};
