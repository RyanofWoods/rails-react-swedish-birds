import React from 'react'
import { BirdWithOrWithoutObservation } from '../../types'

const Bird: React.FC<{bird: BirdWithOrWithoutObservation}> = ({ bird }) => (
  <li>
    {bird.englishName}
  </li>
)

export default Bird
