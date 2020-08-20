export class MenuItem {
  name: string;
  icon: string;
  link?: string[];
  action?: any;
  disabled?: boolean;
}

export class SidebarParams {
  push?: number;
  resize?: number;
}

export class SidebarState {
  isClosed: boolean;
  width: number;
}
