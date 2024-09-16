export class ClientError extends Error {
  constructor(message) {
    this.name = this.constructor.name;
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
