import { Species, ObservationDict } from '../types/speciesData'

const calculateObservedBirdsCount = (birds: Species[], observations: ObservationDict): number => {
  const observedBirdScientifics = Object.keys(observations)

  return birds.filter(bird => observedBirdScientifics.includes(bird.scientificName)).length
}

export default calculateObservedBirdsCount
