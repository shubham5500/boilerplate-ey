import React, { FC, useEffect, useState } from "react"
import {get, isEmpty} from 'lodash';
import { Pagination, TableColumn, ThunkActionType } from "../interfaces/utilsInterface";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { AsyncThunk } from "@reduxjs/toolkit";


interface ListAPIDataInterface extends Pagination {
  results: Array<any>
}

interface TableProps {
  heading: string,
  columns: TableColumn[]
  actions?: React.ReactNode,
  idKey?: string,
  dataSelector: (state: RootState) => ListAPIDataInterface,
  apiFunc: AsyncThunk<any, void, any>,
}

const Table: FC<TableProps> = ({ heading, dataSelector, columns, actions, idKey, apiFunc }) => {

  const data = useAppSelector<ListAPIDataInterface>(dataSelector);

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);

  const apiCall = async () => {
    setLoading(true)
    try {
      await dispatch(apiFunc()).unwrap()
      setLoading(false)
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

  const key = idKey ? idKey : 'id';
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center text-lg font-medium text-gray-800 dark:text-white">
        {heading || ''}
        {actions && <span className="ml-auto">
          {actions}
        </span>}
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
                  {data.results.map((item) => (
                    <tr key={item[key]}>
                      {columns.map((colItem) => (
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap" key={colItem.key}>
                          <div>{colItem.render ? colItem.render(get(item, colItem.key, ''), item) : item[colItem.key]}</div>
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
        <a
          href="#"
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >

          <span>previous</span>
        </a>

        <div className="items-center hidden md:flex gap-x-3">
          <a
            href="#"
            className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
          >
            1
          </a>
          <a
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            2
          </a>
          <a
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            3
          </a>
          <a
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            ...
          </a>
          <a
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            12
          </a>
          <a
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            13
          </a>
          <a
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            14
          </a>
        </div>

        <a
          href="#"
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span>Next</span>

        </a>
      </div>
    </section>
  )
}

export default Table
