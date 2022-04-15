import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBirdsResponse, createObservationResponse, createObservationRequest } from '../types/api'
import { client } from './client'

export const fetchBirds = createAsyncThunk('birds/fetchBirds', async () => {
  const response = await client.get<fetchBirdsResponse>('/birds')
  return response.result
})

export const createObservation = createAsyncThunk(
  'birds/createObservation',
  async (args: createObservationRequest) => {
    const response = await client.post<createObservationResponse>(`/birds/${args.birdScientificName}/observations`, { observed_at: args.observedAt, note: args.note })
    return response.result
  }
)
