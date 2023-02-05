import AppError from ".";
import response from "../utils/response/ResponseHandler";

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
