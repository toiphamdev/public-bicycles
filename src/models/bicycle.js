'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bicycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bicycle.belongsTo(models.TypeCycle, {
        foreignKey: 'type',
        targetKey: 'id',
        as: 'typeData',
      });
      Bicycle.hasMany(models.Order, {
        foreignKey: 'bicycleId',
        sourceKey: 'id',
        as: 'bicycleData',
      });
    }
  }
  Bicycle.init(
    {
      name: DataTypes.TEXT,
      type: DataTypes.INTEGER,
      isLocked: DataTypes.BOOLEAN,
      isRentting: DataTypes.BOOLEAN,
      placeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Bicycle',
    }
  );
  return Bicycle;
};
