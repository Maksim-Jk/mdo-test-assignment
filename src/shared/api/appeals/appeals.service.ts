
import { AxiosResponse } from 'axios'
import { BaseApiService } from '../base-api.service'
import { AppealItemDto, IAppealsResponse, ICreateAppeal, IUpdateAppeal } from './types'

type Ordering = 'number' | '-number' | 'created_at' | '-created_at' | 'status' | '-status'
export interface IAppealsRequestParams {
  page?: number
  page_size?: number
  search?: string
  premise_id?: number
  ordering?: Ordering
}

export class AppealsService extends BaseApiService {
    private static instance: AppealsService;

    public static getInstance (): AppealsService {
      if (!AppealsService.instance) {
        AppealsService.instance = new AppealsService()
      }
      return AppealsService.instance
    }

    public async getAllAppeals (params: IAppealsRequestParams): Promise<IAppealsResponse> {
      const response = await this.api.get<IAppealsResponse>('/appeals/v1.0/appeals/', { params })
      return response.data
    }

    public async createAppeal (data: ICreateAppeal): Promise<AxiosResponse<IAppealsResponse>> {
      const response = await this.api.post<IAppealsResponse>('/appeals/v1.0/appeals/', data)
      return response
    }

    public async updateAppeal (id: string, data: IUpdateAppeal): Promise<AxiosResponse<IAppealsResponse>> {
      const response = await this.api.patch<IAppealsResponse>(`/appeals/v1.0/appeals/${id}/`, data)
      return response
    }

    public async getAppealById (id: number): Promise<AppealItemDto> {
      const response = await this.api.get<AppealItemDto>(`/appeals/v1.0/appeals/${id}/`)
      return response.data
    }
}
