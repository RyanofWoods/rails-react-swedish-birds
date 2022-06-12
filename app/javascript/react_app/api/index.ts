import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBirdsResponse, createObservationResponse, createObservationRequest, editObservationRequest, editObservationResponse, searchBirdsResponse, fetchOrdersResponse, fetchFamiliesResponse } from '../types/api'
import { client } from './client'

export const fetchBirds = createAsyncThunk('birds/fetchBirds', async () => {
  const response = await client.get<fetchBirdsResponse>('/birds')
  return response.result
})

export const fetchFamilies = createAsyncThunk('birds/fetchFamilies', async () => {
  const response = await client.get<fetchFamiliesResponse>('/families')
  return response.result
})

export const fetchOrders = createAsyncThunk('birds/fetchOrders', async () => {
  const response = await client.get<fetchOrdersResponse>('/orders')
  return response.result
})

export const createObservation = createAsyncThunk(
  'birds/createObservation',
  async (args: createObservationRequest) => {
    const response = await client.post<createObservationResponse>(`/birds/${args.birdScientificName}/observations`, { observed_at: args.observedAt, note: args.note })
    return response.result
  }
)

export const editObservation = createAsyncThunk(
  'birds/editObservation',
  async (args: editObservationRequest) => {
    const response = await client.patch<editObservationResponse>(`/observations/${args.birdScientificName}`, { observed_at: args.observedAt, note: args.note })
    return response.result
  }
)

export const searchBirds = createAsyncThunk(
  'birds/search',
  async (query: string) => {
    const response = await client.get<searchBirdsResponse>(`/search?query=${query}`)
    return response.result
  }
)
