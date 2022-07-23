export interface FlashMessageState {
  flashMessage: FlashMessage | null
}

export interface FlashMessage {
  message: string
  type: FlashMessageType
}

type FlashMessageType = 'success' | 'error'
