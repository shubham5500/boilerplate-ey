import { createAsyncThunk } from "@reduxjs/toolkit"
import { CreateClientFormInputs } from "./CreateClient"
import { normalizeCreateClientData } from "./normalizer"
import { client } from "../../utils/client"
import { createClientUrl, getClientUrl, sliceName } from "./consts"
import { ClientDataList } from "../../interfaces/clientInterface"

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
  
  export const getClientList = createAsyncThunk<ClientDataList>(
    `${sliceName}/getClientList`,
    async () => {
      try {
        const response = await client(getClientUrl, {
          body: {
            filters: {},
            page: 1,
            query: "",
            results_per_page: 10,
            sort_by: "",
          },
        })
        return response.data
      } catch (error) {}
    },
  )