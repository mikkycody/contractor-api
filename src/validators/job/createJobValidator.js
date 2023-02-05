import Joi from "joi";
import { Contract } from "../../models";
import Sequelize from "sequelize";

const { Op } = Sequelize;
const checkExistence = (clientId) => async (id) => {
  const contract = await Contract.findOne({
    where: {
      id,
      clientId,
    },
  });
  if (!contract) {
    throw new Error("Invalid contract id");
  }
};
const validateCreateJob = async (payload) => {
  const schema = Joi.object({
    contractId: Joi.number()
      .integer()
      .required()
      .external(checkExistence(payload.userId))
      .messages({ "any.required": "Contract Id is required" }),
    amount: Joi.number()
      .integer()
      .required()
      .messages({ "any.required": "Amount is required" }),
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
export default validateCreateJob;
