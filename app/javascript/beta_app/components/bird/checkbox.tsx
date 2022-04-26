import React, { useEffect, useState, AnimationEvent } from 'react'

interface CheckboxProps {
  classes: string
  checked: boolean
  id: string
  onClick: () => void
  showDateHandler: () => void
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const [animateClass, setAnimateClass] = useState(false)
  const [fadeClass, setFadeClass] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const [showCheckbox, setShowCheckbox] = useState(true)

  // Setting didMount to true upon mounting
  useEffect(() => { setDidMount(true) }, [])

  const { checked, onClick, classes, showDateHandler } = props
  let newClasses = `${classes} checkbox-beta`
  newClasses += (animateClass) ? ' animate' : ''
  newClasses += (fadeClass) ? ' fadeaway' : ''

  const newCheckboxProps = {
    type: 'checkbox',
    className: newClasses,
    onClick,
    checked
  }

  const animate = (): void => {
    setAnimateClass(true)
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.animationName !== 'fadeaway') {
      setAnimateClass(false)
      setFadeClass(true)
    } else {
      setShowCheckbox(false)
      showDateHandler()
    }
  }

  useEffect(() => {
    if (didMount && checked) {
      animate()
    }
    return () => {
      setDidMount(false)
    }
  }, [checked])

  return (
    <div className='checkbox-container'>
      {showCheckbox && <input {...newCheckboxProps} onAnimationEnd={handleAnimationEnd} />}
    </div>
  )
}

export default Checkbox
