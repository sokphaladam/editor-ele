export type DesktopMenuType = {
  name: string | null;
  type: 'mysql' | 'sqlite';
  active: boolean;
  items: DatabaseType[];
}

export type DatabaseType = {
  name: string;
  active: boolean;
  items: Tables[];
}

type Tables = {
  name: string;
}