export interface ObjectType {
  [key: string]: any
}

export interface Pagination {
  page: number
  results_per_page: number
  sort_by: string
  total_results: number
}
