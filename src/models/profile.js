const { Model } = require("sequelize");
const { ProfileTypeEnum } = require("../enums");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Contract, {
        as: "clientContracts",
        foreignKey: "clientId",
        sourceKey: "id",
      });
      Profile.hasMany(models.Contract, {
        as: "contractorContracts",
        foreignKey: "contractorId",
        sourceKey: "id",
      });
    }
  }
  Profile.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      balance: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: Object.values(ProfileTypeEnum),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
