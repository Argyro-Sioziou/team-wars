import axios from "redaxios";
import { createServerFn } from "@tanstack/react-start";
import type { ApiResponse } from "@/api";

export type BuldingType =
  | "BARRACKS"
  | "BLACKSMIT"
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

export const fetchBuildings = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching buildings...");
  return axios
    .get<
      ApiResponse<Array<Building>>
    >(`${process.env.API_BASE_URL}/api/buildings`)
    .then((r) => r.data.data ?? []);
});
