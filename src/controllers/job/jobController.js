import response from "../../utils/response/ResponseHandler";
import jobService from "../../services/job/jobService";
import HttpStatus from "http-status";

/**
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<Object>} Returns a response object with message and job details
 *
 * Creates a new job.
 * If there is a validation error with the payload, a BAD_REQUEST response is returned.
 * If there is an error in the job creation, it is passed to the next middleware.
 */
const createJob = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateCreateJob({
      ...req.body,
      userId: req.user.id,
    });
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    const job = await jobService.create(payload, req.user.id);
    return response(res, "Job Created", HttpStatus.CREATED, job);
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
 * @returns {Promise<Object>} Returns a response object with all unpaid jobs
 *
 * Finds all unpaid jobs with active contract.
 */
const unpaidJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.unpaidJobs(req.user.id);
    return response(res, "Jobs Retrieved", HttpStatus.OK, jobs);
  } catch (error) {
    next(error);
  }
};

/**
 * Pays for a job.
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - Job that was paid for.
 */

const pay = async (req, res, next) => {
  try {
    const job = await jobService.pay(req.params.jobId, req.user.id);
    return response(res, "Payment Successful", HttpStatus.OK, job);
  } catch (error) {
    next(error);
  }
};
export { createJob, unpaidJobs, pay };
