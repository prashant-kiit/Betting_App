import { ClientError } from "./ClientError.js";

export class SchemaError extends ClientError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}

export class AdminSchemaError extends SchemaError {
  constructor(errorString) {
    super(`The admin payload schema is not valid. ${errorString}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserSchemaError extends SchemaError {
  constructor(errorString) {
    super(`The user payload schema is not valid. ${errorString}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class MatchSchemaError extends SchemaError {
  constructor(errorString) {
    super(`The match payload schema is not valid. ${errorString}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BetSchemaError extends SchemaError {
  constructor(errorString) {
    super(`The bet payload schema is not valid. ${errorString}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
