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

// Response interceptor: transform axios errors into typed ApiError shapes and
// reject the promise so callers (Tanstack Query, mutation hooks) receive them
// as thrown exceptions rather than resolved values.
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // Server responded with a non-2xx status — reject with ProblemDetails payload
      if (error.response) {
        return Promise.reject(error.response.data as ProblemDetails)
      }

      // Request was made but timed out (axios sets code to "ECONNABORTED")
      if (error.code === "ECONNABORTED") {
        const timeoutError: TimeoutError = {
          type: "timeout",
          message: "The request took too long. Please try again.",
        }
        return Promise.reject(timeoutError)
      }

      // Request was made but no response received (network failure)
      const networkError: NetworkError = {
        type: "network",
        message: "Unable to reach the server. Please check your connection.",
      }
      return Promise.reject(networkError)
    }

    // Completely unexpected error (not an axios error)
    const unknownError: NetworkError = {
      type: "network",
      message: "An unexpected error occurred.",
    }
    return Promise.reject(unknownError)
  }
)

export default apiClient
