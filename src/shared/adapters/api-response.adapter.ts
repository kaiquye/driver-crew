export class APIResponse<T> {
  readonly error: {
    message: string | string[];
    flag: string;
  };
  readonly status: number;
  readonly data?: T;

  private constructor(status: number, flag: string, message: string, data?: T) {
    this.status = status;

    if (status <= 300) {
      this.data = data;
    }

    if (status >= 400) {
      this.error = {
        message: message,
        flag: flag,
      };
    }

    Object.freeze(this);
  }

  static ok<T>(data: T) {
    return new APIResponse<T>(200, null, null, data);
  }

  static created<T>(data: T) {
    return new APIResponse<T>(201, null, null, data);
  }

  static noContent(flag: string = 'not-content') {
    throw new APIResponse<null>(204, flag, null);
  }

  static badRequest<T>(message: string, flag: string = 'error') {
    throw new APIResponse<T>(400, flag, message);
  }

  static unauthorized<T>(message: string, flag: string = 'error') {
    throw new APIResponse<T>(401, flag, message);
  }

  static forbidden<T>(message: string, flag: string = 'error') {
    throw new APIResponse<T>(403, flag, message);
  }

  static notFound<T>(message: string, flag: string = 'error') {
    throw new APIResponse<T>(404, flag, message);
  }

  static conflict<T>(message: string, flag: string = 'error') {
    throw new APIResponse<T>(409, flag, message);
  }

  static internalServerError<T>(message: string, flag: string = 'error') {
    throw new APIResponse<T>(500, flag, message);
  }
}
