import {ErrorHandling, ErrorsConfig} from '@core/api/entities/errors-config';

export const ERRORS: ErrorsConfig = {
  DEFAULT_ERROR: {
    msg: 'DEFAULT_ERROR',
    action: ErrorHandling.SHOW_ERROR
  },
  DO_NOTHING: {
    action: ErrorHandling.DO_NOTHING
  },
  FORBIDDEN: {
    msg: 'FORBIDDEN',
    action: ErrorHandling.SHOW_ERROR_AND_GO_BACK
  },
  UNAUTHORIZED: {
    msg: 'UNAUTHORIZED',
    action: ErrorHandling.SHOW_ERROR_AND_DISCONNECT
  },
  NOT_FOUND: {
    msg: 'NOT_FOUND',
    action: ErrorHandling.SHOW_ERROR_AND_GO_BACK
  },
  SERVICE_UNAVAILABLE: {
    msg: 'SERVICE_UNAVAILABLE',
    action: ErrorHandling.SHOW_ERROR_AND_GO_TO_UNAIVALABLE_PAGE
  },
};
