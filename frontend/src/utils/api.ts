import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from "@tanstack/react-start/api";
import type { Response as RedaxiosResponse } from "redaxios";

export interface ApiError {
  message: string;
  error: string; // ? perhaps we should call this "code" instead of "error"? it's related to BE response
}

// Backend API response structure
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  success: boolean;
}

function isApiErrorResponse(
  error: unknown
): error is { data: Record<string, any> } {
  return (
    error !== null &&
    typeof error === "object" &&
    "data" in error &&
    error.data !== null &&
    typeof error.data === "object"
  );
}

export async function apiRequestHandler<T>(
  request: () => Promise<RedaxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> {
  try {
    const response = await request();
    const body = response.data as ApiResponse<T>;
    const data = body.data as T;

    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("API request error:", error);

    // Handle API errors from backend
    if (isApiErrorResponse(error)) {
      const responseError = error?.data as ApiError;

      return {
        data: null,
        success: false,
        error: {
          ...responseError,
        },
      };
    }

    // Default error handling
    return {
      data: null,
      success: false,
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        code: "UNKNOWN_ERROR",
      },
    };
  }
}

export default createStartAPIHandler(defaultAPIFileRouteHandler);
