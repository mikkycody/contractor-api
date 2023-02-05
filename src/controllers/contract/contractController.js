import response from "../../utils/response/ResponseHandler";
import contractService from "../../services/contract/contractService";
import validateCreateContract from "../../validators/contract/createContractValidator";
import HttpStatus from "http-status";

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<Object>} Returns a response object with message and contract details
 *
 * Creates a new contract.
 * If there is a validation error with the payload, a BAD_REQUEST response is returned.
 * If there is an error in the contract creation, it is passed to the next middleware.
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<Object>} Returns a response object with message and contract details
 *
 * Finds a contract by id.
 * if no contract is found, a BAD_REQUEST response is returned
 */
const getContract = async (req, res, next) => {
  try {
    const contract = await contractService.find(req.params.id, req.user.id);
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
