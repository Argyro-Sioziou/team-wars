export type BuldingType =
  | "BARRACKS"
  | "BLACKSMITH"
  | "CASTLE"
  | "CITY_WALLS"
  | "WAREHOUSE"
  | "WORKSHOP";

export type Building = {
  name: string;
  type: BuldingType;
  level: number;
  upgrade_cost: number;
  locked: boolean;
};
