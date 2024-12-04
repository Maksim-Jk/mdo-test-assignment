import { BaseApiService } from '@/shared/api'
import { DictionaryResponseType, IDictionariesResponse } from './types'

const DICTIONARIES_URL = {
  premise: '/geo/v2.0/user-premises/',
  apartment: '/geo/v1.0/apartments/'
}

export type DictionaryTypes = keyof DictionaryResponseType

export class DictionariesService extends BaseApiService {
    private static instance: DictionariesService;

    public static getInstance (): DictionariesService {
      if (!DictionariesService.instance) {
        DictionariesService.instance = new DictionariesService()
      }
      return DictionariesService.instance
    }

    public async getDictionary<T extends DictionaryTypes> (
      name: T,
      params: Record<string, string>

    ): Promise<DictionaryResponseType[T][]> {
      const response = await this.api.get<IDictionariesResponse<DictionaryResponseType[T]>>(
        DICTIONARIES_URL[name],
        {
          params
        }
      )
      return response.data.results
    }
}
