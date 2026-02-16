import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const details = err.details?.map((detail) => detail.message) ?? err.message;
    const error = createHttpError(400, 'Bad Request', { errors: details });
    return next(error);
  }
};
