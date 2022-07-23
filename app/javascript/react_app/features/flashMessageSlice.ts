import { createSlice } from '@reduxjs/toolkit'
import { FlashMessageState } from '../types/flashMessageData'

const initialState: FlashMessageState = {
  flashMessage: null
}

export const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState,
  reducers: {
  }
})

export default flashMessageSlice
