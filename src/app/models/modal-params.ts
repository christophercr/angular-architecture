export class ModalParams {
  title: string;
  text?: string;
  component?: any;
  primaryButton?: PrimaryModalButton;
  secondaryButton?: SecondaryModalButton;
  hideButtons?: boolean;
  isLarge?: boolean;
  data?: object;
}

class ModalButton {
  name?: string;
  action?: (params?: any) => any;
}

export class PrimaryModalButton extends ModalButton {
  keepOpen?: boolean;
  disabled?: boolean;
}

export class SecondaryModalButton extends ModalButton {
  hide?: boolean;
}
