import type { Building } from "../building/interfaces";

export type City = {
  id: string;
  name: string;
  icon: string;
  gold: number;
  buildings: Building[];
};
