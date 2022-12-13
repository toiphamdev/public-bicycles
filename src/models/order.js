'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Bicycle, {
        targetKey: 'id',
        foreignKey: 'bicycleId',
        as: 'bicycleData',
      });
    }
  }
  Order.init(
    {
      userEmail: DataTypes.STRING,
      bicycleId: DataTypes.STRING,
      time: DataTypes.STRING,
      price: DataTypes.INTEGER,
      isPay: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
