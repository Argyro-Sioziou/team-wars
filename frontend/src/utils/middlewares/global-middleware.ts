import { registerGlobalMiddleware } from "@tanstack/react-start";
import { logMiddleware } from "@/utils/middlewares/logging-middleware";

registerGlobalMiddleware({
  middleware: [logMiddleware],
});
