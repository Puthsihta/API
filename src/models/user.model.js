"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, {
        sourceKey: "id",
        foreignKey: "userId",
        as: "addresses",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fullName: {
        type: DataTypes.STRING,
        field: "full_name",
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: "phone_number",
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      underscored: true,
    }
  );
  return User;
};
