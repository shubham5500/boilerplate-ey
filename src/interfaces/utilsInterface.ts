import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface ObjectType {
  [key: string]: any
}

export interface TableColumn {
  key: string
  columnLabel: string
  render?: (arg1: any, arg2: any) => React.ReactNode,
}

export interface Pagination {
  page: number
  results_per_page: number
  sort_by: string
  total_results: number
}

export type ThunkActionType<T = string> = ThunkAction<
  void,
  RootState,
  unknown,
  Action<T | string>
>;
