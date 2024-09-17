import { ClientError } from "./ClientError.js";

export class AuthError extends ClientError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 401;
  }
}

export class AdminNotFound extends AuthError {
  constructor(adminUsername) {
    super(`For ${adminUsername}. The admin is not found.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class PasswordIncorrect extends AuthError {
  constructor(adminUsername) {
    super(`For ${adminUsername}. The password is incorrect.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
