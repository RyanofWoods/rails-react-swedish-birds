import { createSlice } from '@reduxjs/toolkit'
import { createObservation, editObservation } from '../api'
import { FlashMessageState } from '../types/flashMessageData'

const initialState: FlashMessageState = {
  flashMessage: null
}

export const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState,
  reducers: {
    clearFlashMessage (state) {
      state.flashMessage = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createObservation.rejected, (state, { error }) => {
      state.flashMessage = { type: 'error', message: (error.message as string) }
    })
    builder.addCase(editObservation.rejected, (state, { error }) => {
      state.flashMessage = { type: 'error', message: (error.message as string) }
    })
  }
})

export const { clearFlashMessage } = flashMessageSlice.actions
export default flashMessageSlice
