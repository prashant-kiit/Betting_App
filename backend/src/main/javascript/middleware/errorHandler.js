const errorHandler = (error, req, res) => {
  console.error(error);
  if (error instanceof MatchNotFound)
    return res.status(error.httpCode).send(error.message);
  return res.status(500).send(error.message);
};

export default errorHandler;
