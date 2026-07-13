import axios, { type AxiosInstance } from "axios"
import type {
  NetworkError,
  ProblemDetails,
  TimeoutError,
} from "~/shared/types/api-error-types"

import env from "@/config/env"
import { AXIOS_API_CLIENT } from "@/config/fetch"

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: AXIOS_API_CLIENT.DEFAULT_TIMEOUT,
  headers: {
    Accept: "application/json",
  },
})

// Response interceptor: transform axios errors into typed error shapes so
// callers receive a resolved value (ApiError) rather than a rejected promise.
// This lets the data/action layer handle errors consistently without try/catch.
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // Server responded with a non-2xx status - return Problem Details payload
      if (error.response) {
        return Promise.resolve(error.response.data as ProblemDetails)
      }

      // Request was made but timed out (axios sets code to "ECONNABORTED")
      if (error.code === "ECONNABORTED") {
        const timeoutError: TimeoutError = {
          type: "timeout",
          message: "The request took too long. Please try again.",
        }
        return Promise.resolve(timeoutError)
      }

      // Request was made but no response received (network failure)
      const networkError: NetworkError = {
        type: "network",
        message: "Unable to reach the server. Please check your connection.",
      }
      return Promise.resolve(networkError)
    }

    // Completely unexpected error (not an axios error)
    const unknownError: NetworkError = {
      type: "network",
      message: "An unexpected error occurred.",
    }
    return Promise.resolve(unknownError)
  }
)

export default apiClient
