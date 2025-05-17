"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      position="top-center"
      className="toaster group]"
      swipeDirections={["top", "right"]}
      theme={theme as ToasterProps["theme"]}
      {...props}
    />
  );
};

export { Toaster };
