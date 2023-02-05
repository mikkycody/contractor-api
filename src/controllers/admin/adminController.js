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
export { getBestProfession };
