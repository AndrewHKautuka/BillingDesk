import axios, { type AxiosInstance } from "axios"

import { AXIOS_API_CLIENT } from "@/config/fetch"

export const apiClient: AxiosInstance = axios.create({
  timeout: AXIOS_API_CLIENT.DEFAULT_TIMEOUT,
  headers: {
    Accept: "application/json",
  },
})

export default apiClient
