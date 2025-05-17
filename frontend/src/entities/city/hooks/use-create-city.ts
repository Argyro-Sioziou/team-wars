import { useRouter } from "@tanstack/react-router";
import { useTransition } from "react";
import { createCity } from "../actions";
import { toast } from "sonner";

export const useCreateCity = () => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const formData = new FormData(e.currentTarget);
        const response = await createCity({ data: formData });

        if (response.error) {
          toast.error(response.error.message);
          return;
        }

        // Make sure we have a valid city ID before navigating
        if (response?.data?.id) {
          router.navigate({ to: `/cities/${response.data.id}` });
        }
      } catch (unexpectedError) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return {
    isLoading,
    handleSubmit,
  };
};
