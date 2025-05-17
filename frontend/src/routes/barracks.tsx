import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/barracks")({
  errorComponent: ({ error }) => {
    return <div>Error loading barracks: {error.message}</div>;
  },
  pendingComponent: () => <Spinner />,
  component: BarracksRoute,
});

function BarracksRoute() {
  return <div>Hello "/barracks"!</div>;
}
