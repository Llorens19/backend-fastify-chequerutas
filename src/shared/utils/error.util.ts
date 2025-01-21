export class ErrorResp extends Error {
  state: number;
  code: string;

  constructor(state: number, code:string, message: string) {
    super(message);
    this.state = state;
    this.code = code;
    this.name = 'ErrorResponse';
  }
}