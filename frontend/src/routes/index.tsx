// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createCity,
  getCities,
  upgradeCityBuilding,
  type City,
} from "@/entities/city";
import { Building } from "@/entities/building";
import DetailedCastle from "@/entities/castle/castle";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [gold, setGold] = useState<number>(10000);
  const [loading, setLoading] = useState<boolean>(true);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [createdCity, setCreatedCity] = useState<City | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const fetchedCities = await getCities();

        // If cities exist, select the first one by default
        if (fetchedCities && fetchedCities.length > 0) {
          setSelectedCity(fetchedCities[0]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch cities";
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCities();
  }, []);

  // Create a new city using FormData
  const handleCreateCity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    try {
      // Create FormData from the form
      const formData = new FormData(e.currentTarget);

      // Call the server function with FormData
      const newCity = await createCity({
        data: formData,
      });
      if (!newCity) {
        throw new Error("Failed to create city");
      }
      setCreatedCity(newCity);
      console.log("Created city:", newCity);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create city";
      setError(errorMessage);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-center">
          <p className="text-lg">Loading cities...</p>
        </div>
      </div>
    );
  }

  const handleUpdateCityBuilding = async (
    e: React.MouseEvent<HTMLButtonElement>,
    buildingType: string
  ) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("cityId", createdCity?.id ?? "");
      formData.append("buildingType", buildingType);

      const updatedCity = await upgradeCityBuilding({
        data: formData,
      });

      if (updatedCity?.data?.error) {
        throw new Error(updatedCity?.data?.error);
      }
      setCreatedCity(updatedCity);
      console.log("Updated city:", updatedCity);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update city";
      setError(errorMessage);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Error message */}
      {error && (
        <div className="bg-destructive/20 text-destructive p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {!createdCity ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center">
            Start your journey now by creating your city
          </h1>
          <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-lg">
            <form
              onSubmit={handleCreateCity}
              className="space-y-4 max-w-md mx-auto"
            >
              <div className="space-y-2">
                <label htmlFor="gold" className="text-sm font-medium">
                  Initial Gold
                </label>
                <input
                  id="gold"
                  name="gold"
                  type="number"
                  value={gold}
                  onChange={(e) => setGold(Number(e.target.value))}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  min="0"
                  step="5000"
                  required
                />
              </div>

              <Button type="submit" disabled={formLoading} className="w-full">
                {formLoading ? "Creating..." : "Create City"}
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              City: {createdCity?.id?.slice(0, 8)}...
            </h2>
            <span className="font-bold text-amber-500">Gold: {gold}</span>
          </div>

          {/* Buildings grid */}
          <div>
            <h3 className="text-lg font-medium mb-3">Buildings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {createdCity?.buildings?.map((building: Building) => (
                <Button
                  key={building.name}
                  disabled={
                    building.locked ||
                    (error ? /not enough gold/i.test(error) : false)
                  }
                  variant={building.locked ? "ghost" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center justify-center gap-2 ${
                    building.locked
                      ? "bg-muted/50 opacity-70 cursor-not-allowed"
                      : "hover:bg-primary/10 hover:border-primary/50 transition-colors"
                  }`}
                  onClick={(e) => handleUpdateCityBuilding(e, building.type)}
                >
                  <span className="font-medium">{building.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Level: {building.level}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      building.locked
                        ? "bg-muted-foreground/30"
                        : "bg-primary/20"
                    }`}
                  >
                    {building.locked
                      ? "Locked"
                      : `Cost: ${building.upgrade_cost}`}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
