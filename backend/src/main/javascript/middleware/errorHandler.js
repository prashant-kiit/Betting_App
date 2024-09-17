import { ClientError } from "../ErrorHandling/ClientError.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof ClientError)
    return res.status(error.httpCode).send(error.name + ": " + error.message);

  return res.status(500).send(error.message);
};

export default errorHandler;
