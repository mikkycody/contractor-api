import response from "../../utils/response/ResponseHandler";
import profileService from "../../services/profile/profileService";
import HttpStatus from "http-status";
import validateDeposit from "../../validators/profile/depositValidator";

/**
 * Deposits money into a user's balance.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<Object>} - A promise that resolves to the updated profile object with the new balance.
 */
const deposit = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateDeposit(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    const profile = await profileService.deposit(payload, req.user.id);
    return response(res, "Deposit Successful", HttpStatus.OK, profile);
  } catch (error) {
    next(error);
  }
};
export { deposit };
