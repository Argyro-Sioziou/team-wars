import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from "@tanstack/react-start/api";

export type ApiResponse<T> = {
  data?: T;
  success: boolean;
};

export default createStartAPIHandler(defaultAPIFileRouteHandler);
