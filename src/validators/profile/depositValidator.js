import Joi from "joi";

const validateDeposit = async (payload) => {
  const schema = Joi.object({
    amount: Joi.number()
      .integer()
      .required()
      .min(1000)
      .messages({ "any.required": "Amount is required", "number.min" : "You can not deposit less than NGN 1000" }),
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
export default validateDeposit;
