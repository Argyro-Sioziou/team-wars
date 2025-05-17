import { CastleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateCity } from "../hooks/use-create-city";

export function CreateCityForm() {
  const { handleSubmit, isLoading } = useCreateCity();

  return (
    <Card className="max-w-sm justify-self-center self-center">
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-amber-400">
            Create Your City
          </CardTitle>
          <CastleIcon size={20} className="text-amber-400" />
        </div>
      </CardHeader>

      <CardFooter className="pb-3">
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <input
            required
            type="text"
            name="name"
            placeholder="City Name"
            className="w-full p-2 border border-input rounded-md bg-background text-black"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-xs py-1 bg-amber-700 hover:bg-amber-800 text-white"
          >
            {isLoading ? "Creating..." : "Create City"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
