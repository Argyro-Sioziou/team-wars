export const upgradeBarackValidator = (data: FormData) => {
  const barrackId = data.get("barrackId");

  if (!barrackId) {
    throw new Error("Building type is required");
  }

  return {
    barrackId,
  };
};
