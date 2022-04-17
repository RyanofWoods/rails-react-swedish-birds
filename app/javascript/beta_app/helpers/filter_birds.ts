import { BirdFilters, BirdWithOrWithoutObservation } from '../types'

interface Options {
  birds: BirdWithOrWithoutObservation[]
  filters: BirdFilters
}

const filterBirds = ({ birds }: Options): BirdWithOrWithoutObservation[] => {
  return birds
}

export default filterBirds
