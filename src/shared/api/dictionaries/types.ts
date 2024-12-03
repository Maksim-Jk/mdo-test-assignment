/* eslint-disable camelcase */
import { IResponseWithPagination } from '../types'

export interface Thoroughfare {
    id: string
    name: string
    kind: string
  }

export interface Locality {
    id: string
    name: string
    kind: string
    phone_code1?: string
    phone_code2?: string
  }

export interface ManageOrganization {
    id: number
    name: string
  }

export interface PremiseDictionaryDto {
    id: string
    title: string
    kind: string
    thoroughfare?: Thoroughfare
    locality: Locality
    address: string
    cadaster_address: string
    full_address: string
    short_address: string
    manage_organization: ManageOrganization
    area?: string
    apartments_area?: string
    apartments_count?: number
    cadaster_numbers: string[]
    customer_premise_id: number
    is_deleted: boolean
  }

export interface IDictionariesResponse<T> extends IResponseWithPagination {
    results: T[]
}

export interface Type {
  id: number
  short_name: string
  full_name: string
  is_residential: boolean
  order: number
}

export interface ApartmentDictionaryDto {
  id: number
  number: string
  type: Type
  square: number
  owner: string
  created_at: string
  label: string
  entrance: number
  floor: number
  area: number
  label_floor_area: string
  is_oss: boolean
}
