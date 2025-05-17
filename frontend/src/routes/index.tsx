import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "@/components/spinner";
import { CreateCityForm } from "@/entities/city/components/create-city-form";
import { CityCard } from "@/entities/city/components/city-card";
import { getCities } from "@/entities/city/actions";

export const Route = createFileRoute("/")({
  loader: async () => {
    const response = await getCities();

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { cities: response.data };
  },
  errorComponent: ({ error }) => {
    return <div>Error loading cities: {error.message}</div>;
  },
  pendingComponent: () => <Spinner />,
  component: CitiesList,
});

function CitiesList() {
  const { cities } = Route.useLoaderData();

  if (!cities || cities.length === 0) {
    return <CreateCityForm />;
  }

  return (
    <div className="grid gap-6 justify-center mx-auto grid-cols-[repeat(auto-fit,minmax(280px,300px))]">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
}
