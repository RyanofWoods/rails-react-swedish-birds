import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSpeciesResponse, fetchObservationsResponse, createObservationResponse, createObservationRequest, editObservationRequest, editObservationResponse, searchSpeciesResponse, fetchOrdersResponse, fetchFamiliesResponse, isUserLoggedInResponse } from '../types/api'
import { client } from './client'

export const fetchSpecies = createAsyncThunk('species/fetchSpecies', async () => {
  const response = await client.get<fetchSpeciesResponse>('/species')
  return response.result
})

export const fetchFamilies = createAsyncThunk('species/fetchFamilies', async () => {
  const response = await client.get<fetchFamiliesResponse>('/families')
  return response.result
})

export const fetchOrders = createAsyncThunk('species/fetchOrders', async () => {
  const response = await client.get<fetchOrdersResponse>('/orders')
  return response.result
})

export const fetchObservations = createAsyncThunk('species/fetchObservatons', async () => {
  const response = await client.get<fetchObservationsResponse>('/observations')
  return response.result
})

export const createObservation = createAsyncThunk(
  'species/createObservation',
  async (args: createObservationRequest) => {
    const response = await client.post<createObservationResponse>(`/species/${args.speciesScientificName}/observations`, { observed_at: args.observedAt, note: args.note })
    return { observation: response.result, speciesScientificName: args.speciesScientificName }
  }
)

export const editObservation = createAsyncThunk(
  'species/editObservation',
  async (args: editObservationRequest) => {
    const response = await client.patch<editObservationResponse>(`/observations/${args.speciesScientificName}`, { observed_at: args.observedAt, note: args.note })
    return { observation: response.result, speciesScientificName: args.speciesScientificName }
  }
)

export const searchSpecies = createAsyncThunk(
  'species/search',
  async (query: string) => {
    const response = await client.get<searchSpeciesResponse>(`/search?query=${query}`)
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
