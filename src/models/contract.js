const { Model, DataTypes } = require("sequelize");
const { ContractStatusEnum } = require("../enums");

module.exports = (sequelize) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.Profile, {
        as: "client",
        foreignKey: "clientId",
      });
      Contract.belongsTo(models.Profile, {
        as: "contractor",
        foreignKey: "contractorId",
      });
      Contract.hasMany(models.Job, { as: "jobs", foreignKey: "contractId" });
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
