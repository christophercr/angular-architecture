export class ErrorsConfig {
  [key: string]: ErrorConfig;
}

export class ErrorConfig {
  action: ErrorHandling;
  msg?: string;
}

export enum ErrorHandling {
  SHOW_ERROR = 'SHOW_ERROR',
  SHOW_ERROR_AND_DISCONNECT = 'SHOW_ERROR_AND_DISCONNECT',
  SHOW_ERROR_AND_GO_BACK = 'SHOW_ERROR_AND_GO_BACK',
  SHOW_ERROR_AND_GO_TO_UNAIVALABLE_PAGE = 'SHOW_ERROR_AND_GO_TO_UNAIVALABLE_PAGE',
  DO_NOTHING = 'DO_NOTHING',
}
