import React from 'react'

import { clearFlashMessage } from '../../features/flashMessageSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const FlashMessage: React.FC = (): JSX.Element | null => {
  const flashMessage = useAppSelector(state => state.flashMessageData.flashMessage)
  const dispatch = useAppDispatch()

  const unmountFlash = (): void => {
    void dispatch(clearFlashMessage())
  }

  const unmountFlashAfterTimer = async (): Promise<void> => {
    await setTimeout(() => {
      unmountFlash()
    }, 10_000)
  }

  if (flashMessage === null) return null

  void unmountFlashAfterTimer()
  const { type, message } = flashMessage

  return (
    <div className={`flash flash-${type}`}>
      <p>{message}</p>

      <button type='button' className='close' aria-label='Close' onClick={unmountFlash}>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  )
}

export default FlashMessage
