import response from "../../utils/response/ResponseHandler";
import adminService from "../../services/admin/adminService";
import HttpStatus from "http-status";

/**
@function
@async
@param {Object} req - Express request object
@param {Object} res - Express response object
@param {Function} next - Express next middleware function
@description Retrieves the best performing contractor based on the total amount earned from jobs between a specified date range.
*/
const getBestProfession = async (req, res, next) => {
  try {
    const profile = await adminService.getBestProfession(
      req.query?.start,
      req.query?.end
    );
    return response(res, "Information Retrieved", HttpStatus.OK, profile);
  } catch (error) {
    next(error);
  }
};

/**
 * Get the best clients in terms of total payment made within a specific date range.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @throws {AppError} If a valid start and end date are not provided in the query, If no records are found within the specified date range.
 * @returns {Object} - Express response object containing the top clients based on total payment made
 */
const getBestClients = async (req, res, next) => {
  try {
    const profile = await adminService.getBestClients(
      req.query?.start,
      req.query?.end,
      req.query?.limit
    );
    return response(res, "Information Retrieved", HttpStatus.OK, profile);
  } catch (error) {
    next(error);
  }
};
export { getBestProfession, getBestClients };
