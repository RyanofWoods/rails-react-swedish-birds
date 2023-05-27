import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSpeciesResponse, fetchObservationsResponse, createObservationResponse, createObservationRequest, editObservationRequest, editObservationResponse, searchBirdsResponse, fetchOrdersResponse, fetchFamiliesResponse, isUserLoggedInResponse } from '../types/api'
import { client } from './client'

export const fetchBirds = createAsyncThunk('birds/fetchBirds', async () => {
  const response = await client.get<fetchSpeciesResponse>('/species')
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

export const fetchObservations = createAsyncThunk('birds/fetchObservatons', async () => {
  const response = await client.get<fetchObservationsResponse>('/observations')
  return response.result
})

export const createObservation = createAsyncThunk(
  'birds/createObservation',
  async (args: createObservationRequest) => {
    const response = await client.post<createObservationResponse>(`/species/${args.birdScientificName}/observations`, { observed_at: args.observedAt, note: args.note })
    return { observation: response.result, birdScientificName: args.birdScientificName }
  }
)

export const editObservation = createAsyncThunk(
  'birds/editObservation',
  async (args: editObservationRequest) => {
    const response = await client.patch<editObservationResponse>(`/observations/${args.birdScientificName}`, { observed_at: args.observedAt, note: args.note })
    return { observation: response.result, birdScientificName: args.birdScientificName }
  }
)

export const searchBirds = createAsyncThunk(
  'birds/search',
  async (query: string) => {
    const response = await client.get<searchBirdsResponse>(`/search?query=${query}`)
    return response.result
  }
)

export const isUserLoggedIn = createAsyncThunk(
  'user/loggedIn',
  async () => {
    const response = await client.get<isUserLoggedInResponse>('/users')
    return response.result
  }
)
