/* eslint-disable camelcase */
import { BaseApiService } from '../base-api.service'
import { IAppeals, IAppealsResponse } from './types'

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

    public async createAppeals (data: IAppeals): Promise<IAppealsResponse> {
      const response = await this.api.post<IAppealsResponse>('/appeals/v1.0/appeals/', data)
      return response.data
    }
}
