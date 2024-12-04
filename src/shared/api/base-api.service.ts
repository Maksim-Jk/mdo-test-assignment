import store from '@/app/store'
import axios, { AxiosInstance } from 'axios'
import { notificationService } from '../lib'

export class BaseApiService {
    protected readonly api: AxiosInstance;
    protected static baseURL = 'https://dev.moydomonline.ru/api'; // TODO: перенести в .env

    constructor () {
      this.api = axios.create({
        baseURL: BaseApiService.baseURL,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.setupInterceptors()
    }

    private setupInterceptors (): void {
      this.api.interceptors.request.use(
        (config) => {
          const token = store.getters['auth/user']?.key
          if (token) {
            config.headers.Authorization = `Token ${token}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )

      this.api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            localStorage.removeItem('token')
          }
          const errorMessage = error.response?.data?.detail || 'Произошла ошибка при выполнении запроса'
          const errorDescription = error.response?.data?.data?.non_field_errors?.join(',') || ''

          notificationService.error({ message: errorMessage, description: errorDescription })

          return Promise.reject(error)
        }
      )
    }
}
