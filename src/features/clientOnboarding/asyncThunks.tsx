import { createAsyncThunk } from "@reduxjs/toolkit"
import { CreateClientFormInputs } from "./CreateClient"
import { normalizeCreateClientData } from "./normalizer"
import { client } from "../../utils/client"
import { createClientUrl, getClientUrl, sliceName } from "./consts"
import {
  PaginationPayload,
} from "../../interfaces/clientInterface"

export const postCreateClient = createAsyncThunk(
  `${sliceName}/createClient`,
  async (data: CreateClientFormInputs) => {
    try {
      const normalizedData = normalizeCreateClientData(data)
      const response = await client(createClientUrl, {
        body: normalizedData,
      })

      return response.data
    } catch (error) {
      throw error
    }
  },
)

export const getClientList = createAsyncThunk(
  `${sliceName}/getClientList`,
  async ({ page = 1, resultPerPage = 10, query = "" }: PaginationPayload) => {
    try {
      const response = await client(getClientUrl, {
        body: {
          filters: {},
          page,
          query,
          results_per_page: resultPerPage,
          sort_by: "",
        },
      })
      return response.data
    } catch (error) {}
  },
)
