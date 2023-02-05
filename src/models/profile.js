import { Model, DataTypes } from "sequelize";
import { ProfileTypeEnum } from "../enums";

export default (sequelize) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Contract, {
        as: "ClientContracts",
        foreignKey: "client_id",
        sourceKey: "id",
      });
      Profile.hasMany(models.Contract, {
        as: "ContractorContracts",
        foreignKey: "contractor_id",
        sourceKey: "id",
      });
    }
  }
  Profile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      type: { type: DataTypes.ENUM, values: Object.values(ProfileTypeEnum) },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
