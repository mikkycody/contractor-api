import response from "../../utils/response/ResponseHandler";
import contractService from "../../services/contract/contractService";
import validateCreateContract from "../../validators/contract/createContractValidator";
import HttpStatus from "http-status";
/**
 * Create Contract
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Created Contract
 */
const createContract = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateCreateContract(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    const updatedPayload = { clientId: req.user.id, ...payload };
    const contract = await contractService.create(updatedPayload);
    return response(res, "Contract Created", HttpStatus.CREATED, contract);
  } catch (error) {
    next(error);
  }
};

/**
 * Create Contract
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Created Contract
 */
const getContract = async (req, res, next) => {
  try {
    const contract = await contractService.find(req.params.id, req.user.id);
    console.log(contract);
    return response(
      res,
      "Contract retrieved successfully",
      HttpStatus.OK,
      contract
    );
  } catch (error) {
    next(error);
  }
};
export { createContract, getContract };
