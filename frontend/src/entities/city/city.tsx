import axios from "redaxios";
import { createServerFn } from "@tanstack/react-start";
import type { ApiResponse } from "@/api";
import type { Building } from "../building";
import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

export type City = {
  id: string;
  gold: number;
  buildings: Building[];
};

export const fetchCities = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching Cities...");
  return axios
    .get<ApiResponse<Array<City>>>(`${process.env.API_BASE_URL}/api/buildings`)
    .then((r) => r.data.data ?? []);
});

export const createCity = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid create city data");
    }
    const gold = data.get("gold");

    if (!gold) {
      throw new Error("Gold is required");
    }

    return {
      gold,
    };
  })
  .handler(async ({ data: { gold } }) => {
    console.info(`Creating City with ${gold}...`);
    return axios
      .post<ApiResponse<City>>(`${process.env.API_BASE_URL}/api/cities`)
      .then((r) => r.data.data);
  });

export const upgradeCityBuilding = createServerFn({
  method: "POST",
})
  .validator((data: FormData) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid upgrade city data");
    }
    const cityId = data.get("cityId");
    const buildingType = data.get("buildingType");

    if (!cityId) {
      throw new Error("City ID is required");
    }

    if (!buildingType) {
      throw new Error("Building type is required");
    }

    return {
      cityId,
      buildingType,
    };
  })
  .handler(async ({ data: { cityId, buildingType } }) => {
    console.info(`Upgrading City with ID ${cityId}...`);
    return axios
      .patch<ApiResponse<City>>(
        `${process.env.API_BASE_URL}/api/cities/${cityId}/buildings/${buildingType.toString().toLowerCase()}/upgrade`
      )
      .then((r) => r.data.data)
      .catch((err) => {
        console.error("Error upgrading city building:", err);
        return err;
      });
  });

export const getCities = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching all cities...");
  return axios
    .get<ApiResponse<string[]>>(`${process.env.API_BASE_URL}/api/cities`)
    .then((r) => {
      console.log(r.data);
      return r.data.data;
    });
});
