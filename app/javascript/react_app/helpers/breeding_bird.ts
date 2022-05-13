import { PopulationCategory } from '../types'

const BREEDINGBIRDTHRESHOLD = 5

const isBreedingBird = (population: PopulationCategory): boolean => {
  return population <= BREEDINGBIRDTHRESHOLD
}

export { isBreedingBird }
