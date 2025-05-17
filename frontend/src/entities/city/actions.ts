import axios from "redaxios";
import { createServerFn } from "@tanstack/react-start";
import {
  createCityValidator,
  getCityByIdValidator,
  upgradeBuildingValidator,
} from "./validators";
import type { City } from "./interfaces";
import { apiRequestHandler, type ApiResponse } from "@/utils/api";

export const getCities = createServerFn({
  method: "GET",
}).handler(async (): Promise<ApiResponse<City[]>> => {
  console.info("Fetching cities...");
  return apiRequestHandler(async () => {
    return axios.get(`${process.env.API_BASE_URL}/api/cities`);
  });
});

export const getCityById = createServerFn({
  method: "GET",
})
  .validator(getCityByIdValidator)
  .handler(async ({ data: { id } }): Promise<ApiResponse<City>> => {
    console.info(`Fetching City with id ${id}...`);
    return apiRequestHandler(async () => {
      return axios.get(`${process.env.API_BASE_URL}/api/cities/${id}`);
    });
  });

export const createCity = createServerFn({
  method: "POST",
})
  .validator(createCityValidator)
  .handler(async ({ data: { name } }): Promise<ApiResponse<City>> => {
    console.info(`Creating city with name ${name}...`);
    return apiRequestHandler(async () => {
      return axios.post(`${process.env.API_BASE_URL}/api/cities`, {
        name,
      });
    });
  });

export const upgradeBuilding = createServerFn({
  method: "POST",
})
  .validator(upgradeBuildingValidator)
  .handler(async ({ data: { city, building } }): Promise<ApiResponse<City>> => {
    console.info(`Upgrading building ${building} of city with ID ${city}...`);
    return apiRequestHandler(async () => {
      return axios.patch(
        `${process.env.API_BASE_URL}/api/cities/${city}/buildings/${building}/upgrade`
      );
    });
  });
