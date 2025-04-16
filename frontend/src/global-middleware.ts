import { registerGlobalMiddleware } from "@tanstack/react-start";
import { logMiddleware } from "@/utils/middlewares/loggingMiddleware";

registerGlobalMiddleware({
  middleware: [logMiddleware],
});
