import AppError from "../../exceptions";
import { Contract, Profile } from "../../models";
import HttpStatus from "http-status";
import Sequelize from "sequelize";

const { Op } = Sequelize;

/**
 * Creates a new contract.
 * @function
 * @async
 * @param {Object} payload - Contract data to be stored.
 * @param {number} payload.clientId - Client's profile ID.
 * @param {number} payload.contractorId - Contractor's profile ID.
 * @returns {Promise<Object>} - Promise object represents the created contract instance.
 * @throws {AppError} - If clientId is equal to contractorId.
 */
const create = async (payload) => {
  if (payload.clientId === payload.contractorId) {
    throw new AppError(
      "You can not create a contract for yourself.",
      HttpStatus.BAD_REQUEST
    );
  }
  return Contract.create(payload);
};

/**
 *Finds a Contract by id and userId
 *@async
 *@function
 *@param {number} id - The id of the contract to find
 *@param {number} userId - The id of the user to check for permission
 *@returns {Promise<Contract>} - Returns the found contract
 *@throws {AppError} - If no contract is found with the specified id and userId, an error with message "No result found." and status code BAD_REQUEST is thrown.
 **/
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
