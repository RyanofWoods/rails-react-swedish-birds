import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createObservation, editObservation } from '../api'
import { FlashMessage, FlashMessageState } from '../types/flashMessageData'

const initialState: FlashMessageState = {
  flashMessage: null
}

export const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState,
  reducers: {
    clearFlashMessage (state) {
      state.flashMessage = null
    },
    setFlashMessage (state, action: PayloadAction<FlashMessage>) {
      state.flashMessage = action.payload
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

export const { clearFlashMessage, setFlashMessage } = flashMessageSlice.actions
export default flashMessageSlice
