/* eslint-disable camelcase */
import { BaseApiService } from '../base-api.service'
import { ApartmentDictionaryDto, IDictionariesResponse, PremiseDictionaryDto } from './types'

const dictionaries_url = {
  premise: '/geo/v2.0/user-premises/',
  apartment: '/geo/v1.0/apartments/'
}
export type DictionaryResponseType = {
  premise: PremiseDictionaryDto;
  apartment: ApartmentDictionaryDto;
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
        dictionaries_url[name],
        {
          params
        }
      )
      return response.data.results
    }
}
