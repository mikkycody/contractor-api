import JoiImport from "joi";
import JoiDate from "@joi/date";
import { Profile } from "../../models";
import {ProfileTypeEnum} from "../../enums";
const Joi = JoiImport.extend(JoiDate);

const checkExistence = async (id) => {
  const user = await Profile.findOne({
    where: { id, type: ProfileTypeEnum.CONTRACTOR },
  });
  if (!user) {
    throw new Error("Invalid contractor id");
  }
};
const validateCreateContract = async (payload) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const schema = Joi.object({
    contractorId: Joi.number()
      .integer()
      .required()
      .external(checkExistence)
      .messages({ "any.required": "Contract Id is required" }),
    startDate: Joi.date()
      .required()
      .format("YYYY-MM-DD")
      .utc()
      .min(date)
      .required()
      .messages({
        "any.required": "Start date is required",
        "date.format": "The start date must be in format YYYY-MM-DD",
        "date.min": "The start date must be today or a date in the future.",
      }),
    endDate: Joi.date()
      .required()
      .format("YYYY-MM-DD")
      .utc()
      .min(Joi.ref("startDate"))
      .required()
      .messages({
        "any.required": "End date is required",
        "date.format": "The end date must be in format YYYY-MM-DD",
        "date.min": "The end date must be greater than the start date",
      }),
  });
  try {
    const value = await schema.validateAsync(payload, {
      stripUnknown: true,
      allowUnknown: false,
      abortEarly: true,
    });
    return { value };
  } catch (error) {
    return { error };
  }
};
export default validateCreateContract;
