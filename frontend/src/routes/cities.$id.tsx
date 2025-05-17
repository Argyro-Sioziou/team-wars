import { createFileRoute } from "@tanstack/react-router";
import { CityDetails } from "@/entities/city/components/city-details";
import { getCityById } from "@/entities/city/actions";
import { Spinner } from "@/components/spinner";

export const Route = createFileRoute("/cities/$id")({
  loader: async ({ params }) => {
    const response = await getCityById({ data: { id: params.id } });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { city: response.data };
  },
  errorComponent: ({ error }) => {
    return <div>Error loading city: {error.message}</div>;
  },
  pendingComponent: () => <Spinner />,
  component: () => {
    const { city } = Route.useLoaderData();
    return <CityDetails city={city} />;
  },
});
