import { IAppealsResponse } from '@/shared/api/appeals'

export type RootState = Record<string, never>

export interface AppealsState {
  appeals: IAppealsResponse[];
  singleAppeal: IAppealsResponse | null;
  isLoading: boolean;
  error: string | null;
  cache: Record<string, IAppealsResponse[]>;
}
