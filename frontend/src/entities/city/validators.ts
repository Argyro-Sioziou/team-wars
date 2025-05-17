import { type City } from "./interfaces";

export const upgradeBuildingValidator = ({
  id,
  building,
}: {
  id: string;
  building: string;
}) => {
  if (!id) {
    throw new Error("City ID is required");
  }

  if (!building) {
    throw new Error("Building is required");
  }

  return {
    city: id,
    building: building.toString().toLowerCase(),
  };
};

export const getCityByIdValidator = (data: Pick<City, "id">) => {
  if (!data.id) {
    throw new Error("City ID is required");
  }

  return {
    id: data.id,
  };
};

export const createCityValidator = (data: FormData) => {
  if (!(data instanceof FormData)) {
    throw new Error("Invalid payload");
  }

  const name = data.get("name");

  if (!name) {
    throw new Error("Name is required");
  }

  return {
    name,
  };
};
