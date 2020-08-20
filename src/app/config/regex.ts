import {RegexConfig} from '@models/regex-config';

export const REGEX: RegexConfig = {
  email: new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-\\+]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
  password: new RegExp('^(?=.*[a-z\u00E0-\u00FC])(?=.*[A-Z])(?=.*[0-9])(?=.*[\'"+_\\- ,.:;!?%=$@%*&\/()#])[\\w\\W\\d]{8,}$'),
  name: new RegExp('^[a-zA-Z\u00E0-\u00FC\' -]{2,255}$'),
  phoneNumber: new RegExp('^[(+)?[0-9 ]*$'),
  generic: new RegExp('^[a-zA-Z0-9\u00E0-\u00FC\-_ ,.:;!?%\\s+=\'"’\(\)-<>&]*$')
};
