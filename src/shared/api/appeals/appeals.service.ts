/* eslint-disable camelcase */
import { BaseApiService } from '../base-api.service'
import { IAppealsResponse } from './types'

export interface IAppealsRequestParams {
  page?: number
  page_size?: number
}

export class AppealsService extends BaseApiService {
    private static instance: AppealsService;

    public static getInstance (): AppealsService {
      if (!AppealsService.instance) {
        AppealsService.instance = new AppealsService()
      }
      return AppealsService.instance
    }

    public async getRequests (params: IAppealsRequestParams): Promise<IAppealsResponse> {
      const response = await this.api.get<IAppealsResponse>('/appeals/v1.0/appeals/', { params })
      return response.data
    }

    public async logout (): Promise<void> {
      await this.api.post('/logout')
    }
}
