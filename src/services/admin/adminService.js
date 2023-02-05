import { sequelize } from "../../models";
import AppError from "../../exceptions/index";
import HttpStatus from "http-status";

/**
 * Get the best contractor based on total earnings from jobs within a date range
 * @function
 * @async
 * @param {Date} startDate - Start date of the range
 * @param {Date} endDate - End date of the range
 * @throws {AppError} When startDate or endDate is not provided
 * @throws {AppError} When no records are found for the given date range
 * @returns {Object} - The best contractor record with their id, firstName, lastName and totalEarned
 */
const getBestProfession = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new AppError(
      "Please provide a valid date range",
      HttpStatus.BAD_REQUEST
    );
  }
  const start = new Date(startDate);
  const end = new Date(endDate);

  const result = await sequelize.query(
    `
    SELECT Profile.id, Profile.firstName, Profile.lastName, SUM(Job.amount) as 'totalEarned'
    FROM profiles as Profile
    JOIN contracts as Contract ON Profile.id = Contract.contractorId
    JOIN jobs as Job ON Job.contractId = Contract.id
    WHERE Job.isPaid = true
    AND Job.createdAt BETWEEN :start AND :end
    GROUP BY Contract.id
    ORDER BY totalEarned DESC
    LIMIT 1
    `,
    {
      replacements: { start, end },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  if (!result.length) {
    throw new AppError("No records found", HttpStatus.BAD_REQUEST);
  }
  return result[0];
};

/**
@function getBestClients
@param {string} startDate The start date of the date range to search in
@param {string} endDate The end date of the date range to search in
@param {number} limit The maximum number of results to retrieve, default value is 2
@throws {AppError} If start date or end date is not provided, If no records are found
@returns {Array} An array of objects representing the top clients in terms of jobs paid
*/
const getBestClients = async (startDate, endDate, limit) => {
  if (!startDate || !endDate) {
    throw new AppError(
      "Please provide a valid date range",
      HttpStatus.BAD_REQUEST
    );
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const defaultLimit = 2;
  const max = parseInt(limit ?? defaultLimit);
  const result = await sequelize.query(
    `
    SELECT Profile.id, Profile.firstName, Profile.lastName, SUM(Job.amount) as 'totalPaid'
    FROM profiles as Profile
    JOIN contracts as Contract ON Profile.id = Contract.clientId
    JOIN jobs as Job ON Job.contractId = Contract.id
    WHERE Job.isPaid = true
    AND Job.createdAt BETWEEN :start AND :end
    GROUP BY Contract.id
    ORDER BY totalPaid DESC
    LIMIT :max
    `,
    {
      replacements: { start, end, max },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  if (!result.length) {
    throw new AppError("No records found", HttpStatus.BAD_REQUEST);
  }
  return result;
};

export default { getBestProfession, getBestClients };
