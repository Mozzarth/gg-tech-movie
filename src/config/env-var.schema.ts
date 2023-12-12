import * as Joi from 'joi';

export const envVarsSchema = Joi.object({
  API_PORT: Joi.number().required(),
});
