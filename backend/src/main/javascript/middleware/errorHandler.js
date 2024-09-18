import { ClientError } from "../ErrorHandling/ClientError.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof ClientError)
    return res.status(error.httpCode).send(error.name + ": " + error.message);

  return res.status(500).send("Server Error :" + error.message);
};

export default errorHandler;
