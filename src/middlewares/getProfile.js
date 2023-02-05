/* eslint-disable consistent-return */
import Logger from "../logger";
import response from "../utils/response/ResponseHandler";
import {Profile} from "../models";
/**
 * Middleware to handle profile authorization.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Function}
 */
export default async (req, res, next) => {
  try {
    const profileId = req?.headers?.profile_id;
    if (!profileId) {
      return response(res, "Access denied, no profile id provided", 401);
    }
    const user = await Profile.findByPk(profileId);
    if (!user) {
      return response(res, "Unauthorized", 401);
    }
    req.user = user;
    next();
  } catch (error) {
    Logger.error(error);
    return response(res, "Access denied", 401);
  }
};
