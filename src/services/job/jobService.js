import { Job, Contract, Profile } from "../../models";
import { ContractStatusEnum } from "../../enums";
import Sequelize from "sequelize";

const { Op } = Sequelize;
/**
 * Creates a new job record.
 * @async
 * @function
 * @param {Object} payload - The job data to be stored.
 * @returns {Promise<Object>} - A promise that resolves to the newly created job record.
 */
const create = async (payload) => {
  return Job.create(payload);
};

/**
 * Retrieves all unpaid jobs.
 * @async
 * @function
 * @param {String} userId - The ID of the user to retrieve unpaid jobs for.
 * @returns
 */
const unpaidJobs = async (userId) => {
  return Job.findAll({
    where: {
      isPaid: false,
    },
    include: [
      {
        model: Contract,
        as: "contract",
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
        where: {
          [Op.or]: [{ clientId: userId }, { contractorId: userId }],
          status: ContractStatusEnum.IN_PROGRESS,
        },
      },
    ],
  });
};

export default { create, unpaidJobs };
