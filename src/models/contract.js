import { Model, DataTypes } from "sequelize";
import { ContractStatusEnum } from "../enums";
export default (sequelize) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.Profile, {
        as: "Client",
        foreignKey: "clientId",
      });
      Contract.belongsTo(models.Profile, {
        as: "Contractor",
        foreignKey: "contractorId",
      });
      Contract.hasMany(models.Job, { as: "Jobs", foreignKey: "contractId" });
    }
  }
  Contract.init(
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Profiles",
          key: "id",
        },
      },
      contractorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Profiles",
          key: "id",
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(ContractStatusEnum),
        defaultValue: "new",
      },
    },
    {
      sequelize,
      modelName: "Contract",
    }
  );
  return Contract;
};
