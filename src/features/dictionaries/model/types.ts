import { DictionaryTypes, PremiseDictionaryDto } from '../api'

export interface DictionariesState {
  dictionaries: {
    [key in DictionaryTypes]: PremiseDictionaryDto[];
  } | Record<string, never>;
  isLoading: boolean;
  error: string | null;
  cache: Record<string, PremiseDictionaryDto[]>;
}

export interface DictionaryParams {
  name: DictionaryTypes;
  options: Record<string, string>;
}
