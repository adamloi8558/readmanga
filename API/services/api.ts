import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosError } from 'axios'

/**
 * Type-safe API request wrapper
 */
export async function apiRequest<TResponse>(
  instance: AxiosInstance,
  config: AxiosRequestConfig
): Promise<TResponse> {
  try {
    const response = await instance.request<TResponse>(config)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      })
    }
    throw error
  }
}
