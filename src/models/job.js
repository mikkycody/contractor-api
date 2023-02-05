const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
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
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
