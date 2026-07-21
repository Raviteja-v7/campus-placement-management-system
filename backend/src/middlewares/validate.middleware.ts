import type { RequestHandler } from "express";
import type { AnyObjectSchema } from "yup";

type ValidationSource = "body" | "params" | "query";

export const validate = (
  schema: AnyObjectSchema,
  source: ValidationSource = "body",
): RequestHandler => {
  return async (req, _res, next) => {
    try {
      req[source] = await schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};
