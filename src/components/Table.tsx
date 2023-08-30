import { AsyncThunk } from "@reduxjs/toolkit"
import { get, isEmpty } from "lodash"
import React, { FC, useEffect, useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { RootState, useAppSelector } from "../app/store"
import { Pagination, TableColumn } from "../interfaces/utilsInterface"

enum PaginationEnums {
  next = "next",
  prev = "prev",
}
interface ListAPIDataInterface extends Pagination {
  results: Array<any>
}

interface TableProps {
  heading: string
  columns: TableColumn[]
  actions?: React.ReactNode
  idKey?: string
  dataSelector: (state: RootState) => ListAPIDataInterface
  apiFunc: AsyncThunk<any, any, any>
}

const Table: FC<TableProps> = ({
  heading,
  dataSelector,
  columns,
  actions,
  idKey,
  apiFunc,
}) => {
  const data = useAppSelector<ListAPIDataInterface>(dataSelector)

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const apiCall = async (data = {}) => {
    setLoading(true)
    try {
      await dispatch(apiFunc(data)).unwrap()
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  if (isEmpty(data) || !data.results.length) {
    return <div>No data found...</div>
  }

  const pages = Math.ceil(data.total_results / 10)

  const key = idKey ? idKey : "id"

  const onChangePage = (changeType: PaginationEnums) => {
    if (changeType === PaginationEnums.next) {
      if (data.page !== pages) {
        apiCall({ page: data.page + 1 })
      }
    } else if (changeType === PaginationEnums.prev) {
      if (data.page > 1) {
        apiCall({ page: data.page - 1 })
      }
    }
  }

  const array = Array.from({ length: 10 })
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center text-lg font-medium text-gray-800 dark:text-white">
        {heading || ""}
        {actions && <span className="ml-auto">{actions}</span>}
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {columns.map((item) => (
                      <th
                        key={item.key}
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        {item.columnLabel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {loading &&
                    array.map((item, index) => (
                      <tr key={index} className="w-full">
                        {columns.map((item) => (
                          <td className="p-2" key={item.columnLabel}>
                            <div className="bg-gray-200 h-4 animate-pulse my-1"></div>
                          </td>
                        ))}
                      </tr>
                    ))}

                  {!loading &&
                    data.results.map((item) => (
                      <tr key={item[key]}>
                        {columns.map((colItem) => (
                          <td
                            className="px-4 py-4 text-sm font-medium whitespace-nowrap"
                            key={colItem.key}
                          >
                            <div>
                              {colItem.render
                                ? colItem.render(
                                    get(item, colItem.key, ""),
                                    item,
                                  )
                                : item[colItem.key]}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span
          onClick={() => onChangePage(PaginationEnums.prev)}
          className={`${
            pages === data.page && "cursor-not-allowed"
          } flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800`}
        >
          <span>previous</span>
        </span>

        <div className="items-center hidden md:flex gap-x-3">
          {Array.from({ length: pages }).map((page, index) => (
            <span
              key={index}
              className={`px-2
               py-1 text-sm
                text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60 ${
                  index + 1 === data.page && "border border-grey"
                }`}
            >
              {index + 1}
            </span>
          ))}
        </div>

        <span
          className={`${
            pages === data.page && "cursor-not-allowed"
          } flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800`}
          onClick={() => onChangePage(PaginationEnums.next)}
        >
          <span>Next</span>
        </span>
      </div>
    </section>
  )
}

export default Table
