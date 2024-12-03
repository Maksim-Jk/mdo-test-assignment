import { IResponseWithPagination } from '../types'

/* eslint-disable camelcase */
export interface Status {
    id: number
    name: string
    full_details: string
    short_details: string
    is_red_details: boolean
}

export interface Category {
    id: number
    name: string
    full_name: string
    module: string
}

export interface Thoroughfare {
    id: string
    name: string
    kind: string
}

export interface Locality {
    id: string
    name: string
    kind: string
    phone_code1: string
    phone_code2?: string
}

export interface ManageOrganization {
    id: number
    name: string
}

export interface Premise {
    id: string
    title: string
    kind: string
    thoroughfare: Thoroughfare
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

export interface Apartment {
    id: number
    number: string
    object_type: string
    label: string
}

export interface Applicant {
    username: string
    last_name: string
    first_name: string
    email?: string
    patronymic_name: string
}

export interface Performer {
    id: number
    employee_id: number
    username: string
    last_name: string
    first_name: string
    email: string
    patronymic_name: string
    position: string
    full_name_position: string
}

export interface Performer2 {
    id: number
    employee_id: number
    username: string
    last_name: string
    first_name: string
    email: string
    patronymic_name: string
    position: string
    full_name_position: string
}

export interface CreatedBy {
    id: number
    employee_id: number
    username: string
    last_name: string
    first_name: string
    email: string
    patronymic_name: string
    position: string
    full_name_position: string
}

export interface CreatedByEmployee {
    id: number
    employee_id: number
    username: string
    last_name: string
    first_name: string
    email: string
    patronymic_name: string
    position: string
    full_name_position: string
}

export interface UpdatedByEmployee {
    id: number
    employee_id: number
    username: string
    last_name: string
    first_name: string
    email: string
    patronymic_name: string
    position: string
    full_name_position: string
}

export interface StatusLog {
    created_at: string
    assigned_at?: string
    delayed_at?: string
    executed_at?: string
    rated_at: any
    completed_at?: string
    refused_at?: string
    rejected_at?: string
    transferred_at?: string
    viewed_at: any
}

export interface StatusCount {
    created: number
    assigned: number
    delayed: number
    executed: number
    rated: number
    completed: number
    refused: number
    rejected: number
    transferred: number
    received: number
    active: number
}

export interface FilteredStatusCount {
    created: number
    assigned: number
    delayed: number
    executed: number
    rated: number
    completed: number
    refused: number
    rejected: number
    transferred: number
    received: number
    active: number
}

export interface AppealItemDto {
    id: string
    setting: number
    setting_name: string
    number: number
    status: Status
    category?: Category
    viewed_by_me: boolean
    premise?: Premise
    apartment?: Apartment
    applicant: Applicant
    performer?: Performer
    performers: Performer2[]
    priority: any
    rating: any
    description: string
    created_by?: CreatedBy
    created_by_employee?: CreatedByEmployee
    updated_by_employee: UpdatedByEmployee
    start_at: any
    due_date?: string
    created_at: string
    common_areas: any
    updated_at: string
    attachments: any[]
    status_log: StatusLog
    not_viewed_appeal_changes: boolean
}

export interface IAppealsResponse extends IResponseWithPagination {
    status_count: StatusCount
    filtered_status_count: FilteredStatusCount
    results: AppealItemDto[]
}

export interface IAppeals {
    premise_id: number
    apartment_id: number
    applicant: Applicant
    description: string
    due_date: string
    status: string
}
