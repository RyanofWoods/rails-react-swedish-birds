import { PopulationCategory } from '../types/birdData'

const BREEDINGBIRDTHRESHOLD = 5

const isBreedingBird = (population: PopulationCategory): boolean => {
  return population <= BREEDINGBIRDTHRESHOLD
}

export { isBreedingBird }
