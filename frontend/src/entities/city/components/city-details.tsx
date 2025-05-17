import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import type { City } from "../interfaces";
import { useUpgradeBuilding } from "../hooks/use-upgrade-building";

export const CityDetails: React.FC<{ city: City | null }> = ({ city }) => {
  const { error, handleBuildingUpgrade } = useUpgradeBuilding();

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="flex max-h-screen mt-10 flex-col items-center justify-center space-y-4">
      <div className="flex justify-between items-center flex-col space-y-2">
        <h1 className="text-4xl font-extrabold">{city?.name}</h1>
        <span className="font-bold text-amber-500">
          Gold: {city?.gold?.toLocaleString()}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {city?.buildings.map((building) => {
          return (
            <Button
              key={building.name}
              disabled={building.locked}
              variant={building.locked ? "secondary" : "outline"}
              className={`h-auto p-4 flex flex-col items-center justify-center gap-2 ${
                building.locked && "bg-muted/50 opacity-70 cursor-not-allowed"
              }`}
              onClick={() =>
                handleBuildingUpgrade({
                  id: city.id,
                  building,
                })
              }
            >
              <span className="font-medium capitalize">
                {building.name.replace("_", " ")}
              </span>
              <span className="text-sm text-muted-foreground">
                Level: {building.level}
              </span>
              <span className="text-xs px-2 py-1 rounded-full">
                {building.locked ? "Locked" : `Cost: ${building.upgrade_cost}`}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
