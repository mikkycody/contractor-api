import { Job, Contract, Profile } from "../../models";
import { ContractStatusEnum } from "../../enums";
import Sequelize from "sequelize";
import AppError from "../../exceptions";
import HttpStatus from "http-status";
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

/**
 * Pays for a job.
 * @async
 * @function
 * @param {Number} jobId - The ID of the job to pay for.
 * @param {Number} clientId - The ID of the client making the payment.
 * @returns {Promise<Object>} - A promise that resolves to the updated job object.
 * @throws {AppError} If the job is not found, payment has already been made, or the client has insufficient funds.
 */
const pay = async (jobId, clientId) => {
  const job = await Job.findByPk(jobId, {
    include: [
      {
        model: Contract,
        as: "contract",
      },
    ],
  });
  if (!job) {
    throw new AppError("Job not found", HttpStatus.NOT_FOUND);
  }
  if (job.isPaid) {
    throw new AppError("Payment already made", HttpStatus.BAD_REQUEST);
  }
  const client = await Profile.findByPk(clientId);
  const clientBalance = client.balance;
  const jobAmount = job.amount;
  if (jobAmount >= clientBalance) {
    throw new AppError("Insufficient funds", HttpStatus.BAD_REQUEST);
  }
  await job.update({ isPaid: true });
  await client.update({ balance: clientBalance - jobAmount });
  const contractor = await Profile.findByPk(job.contract.contractorId);
  contractor.update({ balance: contractor.balance + jobAmount });
  return job;
};

export default { create, unpaidJobs, pay };
