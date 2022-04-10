import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBirdsResponse } from '../types/api'
import { client } from './client'

export const fetchBirds = createAsyncThunk('birds/fetchBirds', async () => {
  const response = await client.get<fetchBirdsResponse>('/birds')
  return response.result
})
