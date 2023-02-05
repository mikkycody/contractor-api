import { Model, DataTypes } from "sequelize";
export default (sequelize) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Contract, {
        foreignKey: "contract_id",
        targetKey: "id",
      });
    }
  }
  Job.init(
    {
      contractId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Contract",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
