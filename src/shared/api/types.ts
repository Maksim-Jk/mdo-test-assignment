/* eslint-disable camelcase */
export interface IResponseWithPagination {
    count: number
    pages: number
    page_size: number
    page: number
    page_next: number
    page_previous: number | null
};
