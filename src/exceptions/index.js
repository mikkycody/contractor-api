class AppError extends Error {
  /**
   * Description
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.name = "AppError";
    this.code = statusCode;
  }
}
export default AppError;
