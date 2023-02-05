import response from "../../utils/response/ResponseHandler";
import contractService from "../../services/contract/contractService";
import validateCreateContract from "../../validators/contract/createContractValidator";
import AppError from "../../exceptions";
import HttpStatus from "http-status";
import Logger from "../../logger";
/**
 * Create Contract
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Created Contract
 */
const createContract = async (req, res) => {
  try {
    const { error, value: payload } = await validateCreateContract(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    if (req.user.id === payload.contractorId) {
      throw new AppError(
        "You can not create a contract for yourself.",
        HttpStatus.BAD_REQUEST
      );
    }
    const updatedPayload = { clientId: req.user.id, ...payload };
    const contract = await contractService.create(updatedPayload);
    return response(res, "Contract Created", 201, contract);
  } catch (error) {
    if (error.name === AppError.name) {
      return response(res, error.message, error.code);
    }
    Logger.error(error?.message);
    return response(
      res,
      "Something went wrong",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export { createContract };
