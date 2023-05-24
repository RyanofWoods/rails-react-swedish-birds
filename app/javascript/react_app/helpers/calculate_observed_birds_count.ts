import { BirdWithOrWithoutObservation, ObservationDict } from '../types/birdData'

const calculateObservedBirdsCount = (birds: BirdWithOrWithoutObservation[], observations: ObservationDict): number => {
  const observedBirdScientifics = Object.keys(observations)

  return birds.filter(bird => observedBirdScientifics.includes(bird.scientificName)).length
}

export default calculateObservedBirdsCount
