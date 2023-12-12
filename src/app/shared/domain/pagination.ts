export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface PaginatedRequest {
  page: number;
  pageSize: number;
}
