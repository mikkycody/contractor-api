/**
 * Response Handler
 * @param {object} res
 * @param {string} message
 * @param {number} statusCode=200
 * @param {array} data=[]
 * @param {array} errors=[]
 * @returns {object}
 */
const response = (res, message, statusCode = 200, data = [], errors = []) => {
  const resObj = {
    status: statusCode >= 200 && statusCode <= 299 ? true : false,
    message: message ?? "",
    data,
  };
  let resJson = resObj;
  if (!(statusCode >= 200 && statusCode <= 299)) {
    resJson = { ...resObj, errors };
  }
  return res.status(statusCode).json(resObj);
};

export default response;
