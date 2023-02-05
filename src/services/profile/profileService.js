import { Profile, sequelize } from "../../models";
import { ContractStatusEnum } from "../../enums";
import AppError from "../../exceptions/index";
import HttpStatus from "http-status";

/**
 * Deposits money into a user's balance.
 * @async
 * @function
 * @param {Object} payload - Object containing the deposit data.
 * @param {number} clientId - The id of the user making the deposit.
 * @returns {Promise<Object>} - A promise that resolves to the updated profile object with the new balance.
 * @throws {Error} If there's an error during deposit or if the deposit amount is higher than the deposit limit.
 */
const deposit = async (payload, clientId) => {
  const amount = payload.amount;
  const getUnpaidJobsAmount =
    (
      await sequelize.query(
        `
  SELECT SUM(amount) AS unpaidAmount
  FROM jobs
  WHERE isPaid = false
  AND EXISTS (
    SELECT *
    FROM contracts
    WHERE jobs.contractId = contracts.id
    AND contracts.clientId = :clientId
    AND contracts.status = :status
  )`,
        {
          replacements: { clientId, status: ContractStatusEnum.IN_PROGRESS },
          type: sequelize.QueryTypes.SELECT,
        }
      )
    )[0]["unpaidAmount"] ?? 0;
  const minAmount = 1000;
  const maxAmount =
    getUnpaidJobsAmount > 0
      ? parseInt(0.25 * getUnpaidJobsAmount) + parseInt(getUnpaidJobsAmount)
      : minAmount;
  if (amount > maxAmount) {
    throw new AppError(
      "You have exceeded your deposit limit",
      HttpStatus.BAD_REQUEST
    );
  }

  const user = await Profile.findByPk(clientId);
  await user.update({ balance: user.balance + amount });
  return user;
};

export default { deposit };
