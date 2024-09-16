import { ClientError } from "./ClientError";

export class SchemaError extends ClientError {
  constructor(message) {
    this.name = this.constructor.name;
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AdminSchemaError extends SchemaError {
  constructor(errorString) {
    this.name = this.constructor.name;
    super(`The admin payload schema is not valid. ${errorString}`);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserSchemaError extends SchemaError {
  constructor(errorString) {
    this.name = this.constructor.name;
    super(`The user payload schema is not valid. ${errorString}`);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class MatchSchemaError extends SchemaError {
  constructor(errorString) {
    this.name = this.constructor.name;
    super(`The match payload schema is not valid. ${errorString}`);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BetSchemaError extends SchemaError {
  constructor(errorString) {
    this.name = this.constructor.name;
    super(`The bet payload schema is not valid. ${errorString}`);
    Error.captureStackTrace(this, this.constructor);
  }
}
