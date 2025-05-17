export type Unit = {
  id: string;
  name: string;
  icon: string;
  level: number;
  attack: number;
  defense: number;
};

export type Barrack = {
  id: string;
  name: string;
  icon: string;
  level: number;
  units: Array<Unit>;
};
