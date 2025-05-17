import { createServerFn } from "@tanstack/react-start";
import { upgradeBarackValidator } from "./validators";

// TODO: Implementation
export const getBarracks = createServerFn({
  method: "GET",
}).handler(async (ctx) => {
  console.info("Fetching city barracks...");
  return Promise.resolve([]);
});

export const upgradeBarracks = createServerFn({
  method: "POST",
})
  .validator(upgradeBarackValidator)
  .handler(async ({ data: { barrackId } }) => {
    console.info(`Upgrade Barrack with ID ${barrackId}...`);
    return Promise.resolve();
  });
