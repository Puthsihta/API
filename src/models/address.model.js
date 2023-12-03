"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }
  Address.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      street: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        field: "user_id",
      },
    },
    {
      sequelize,
      modelName: "Address",
      timestamps: true,
      underscored: true,
    }
  );
  return Address;
};
