/**
 * Response Handler
 * @param {object} res
 * @param {string} message
 * @param {number} statusCode=200
 * @param {array} data=[]
 * @returns {object}
 */
const response = (res, message, statusCode = 200, data = []) => {
  return res.status(statusCode).json({
    status: statusCode >= 200 && statusCode <= 299 ? true : false,
    message: message ?? "",
    data,
  });
};

export default response;
