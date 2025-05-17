import { useState } from "react";
import type { Building } from "@/entities/building/interfaces";
import type { ApiError } from "@/utils/api";
import { useRouter } from "@tanstack/react-router";
import { upgradeBuilding } from "../actions";

export const useUpgradeBuilding = () => {
  const router = useRouter();
  const [error, setError] = useState<ApiError | null>(null);

  const handleBuildingUpgrade = async (payload: {
    id: string;
    building: Building;
  }) => {
    const response = await upgradeBuilding({
      data: {
        id: payload.id,
        building: payload.building.name,
      },
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    await router.invalidate({
      sync: true,
    });
  };

  return {
    error,
    handleBuildingUpgrade,
  };
};
