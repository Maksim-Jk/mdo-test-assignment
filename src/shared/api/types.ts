export interface IResponseWithPagination {
    count: number
    pages: number
    page_size: number
    page: number
    page_next: number | null
    page_previous: number | null
}
