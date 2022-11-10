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
    }
  }
  Order.init(
    {
      orderCode: DataTypes.STRING,
      placeId: DataTypes.STRING,
      date: DataTypes.STRING,
      typeBicycle: DataTypes.STRING,
      timeType: DataTypes.STRING,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      statusId: DataTypes.STRING,
      note: DataTypes.STRING,
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
