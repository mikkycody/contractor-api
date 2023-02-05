import AppError from ".";
import Logger from "../logger";
import response from "../utils/response/ResponseHandler";
import HttpStatus from "http-status";
const ErrorHandler = (err, req, res, next) => {
  if (err.name === AppError.name) {
    return response(res, err.message, err.code);
  }
  Logger.error(err?.message);
  return response(
    res,
    "Something went wrong",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};

export default ErrorHandler;
