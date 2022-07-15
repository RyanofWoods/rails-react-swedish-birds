import { createSlice } from '@reduxjs/toolkit'
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
  }
})

export const { clearFlashMessage } = flashMessageSlice.actions
export default flashMessageSlice
