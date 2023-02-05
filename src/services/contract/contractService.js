import AppError from "../../exceptions";
import { Contract, Profile } from "../../models";
import HttpStatus from "http-status";
import Sequelize from "sequelize";

const { Op } = Sequelize;
const create = async (payload) => {
  if (payload.clientId === payload.contractorId) {
    throw new AppError(
      "You can not create a contract for yourself.",
      HttpStatus.BAD_REQUEST
    );
  }
  return Contract.create(payload);
};

const find = async (id, userId) => {
  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [{ clientId: userId }, { contractorId: userId }],
    },
    include: [
      {
        model: Profile,
        as: "client",
        attributes: { exclude: ["balance"] },
      },
      {
        model: Profile,
        as: "contractor",
        attributes: { exclude: ["balance"] },
      },
    ],
  });
  if (!contract) {
    throw new AppError("No result found.", HttpStatus.BAD_REQUEST);
  }
  return contract;
};

export default { create, find };
