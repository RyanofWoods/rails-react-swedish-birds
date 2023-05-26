import { Bird, PopulationCategory, PopulationLevel } from '../types/birdData'

const POPULATION_BREEDING_THRESHOLD = 5

const isBreedingBird = (population: PopulationCategory): boolean => {
  return population <= POPULATION_BREEDING_THRESHOLD
}

const populationCategoryToLevel = (populationCategory: PopulationCategory): PopulationLevel => {
  const cappedCategory = isBreedingBird(populationCategory) ? populationCategory : populationCategory - POPULATION_BREEDING_THRESHOLD
  const inversedCategory = POPULATION_BREEDING_THRESHOLD + 1 - cappedCategory as PopulationLevel
  return inversedCategory
}

const populationInfo = (bird: Bird): string => {
  const text = []
  switch (bird.populationCategory) {
    case 1:
      text.push('Est. observations above 1,000,000')
      break
    case 2:
      text.push('Est. observations above 100,000 and below 1,000,000')
      break
    case 3:
      text.push('Est. observations above 10,000 and below 100,000')
      break
    case 4:
      text.push('Est. observations above 100 and below 10,000')
      break
    case 5:
      text.push('Est. observations below 100')
      break
    case 6:
      text.push('Non-breeding yearly guest in not insignificant numbers')
      break
    case 7:
      text.push('Seen once every year or few years')
      break
    case 8:
      text.push('Seen once/few times every 10 years')
      break
    case 9:
      text.push('Seen once/few times ever')
      break
    default:
      text.push('No info available')
  }
  if (bird.details.includes('[')) {
    text.push('No wild finds, probably escaped from captivity')
  }
  return text.join('. ') + '.'
}

const migrationText = (bird: Bird): string => {
  const text = []
  if (bird.details.includes('Hs ')) {
    text.push('Breeding non-migratory bird')
  }
  if (bird.details.includes('Hf ')) {
    text.push('Breeding migratory bird')
  }
  if (bird.details.includes('Hs+f ')) {
    text.push('Breeding bird, part stays and part migrates')
  }
  if (bird.details.includes('Hs (f) ')) {
    text.push('Breeding bird, most stay and minority migrates')
  }
  if (bird.details.includes('F')) {
    text.push('Large amounts passes through the country in spring and autumn during migration')
  }
  if (bird.details.includes('(V)')) {
    text.push('Rarely seen during winter')
  }
  if (bird.details.match(/V[^)]/) != null) {
    text.push('Can be seen in winter')
  }
  if (bird.populationCategory > 5) {
    text.push('Occasional guest')
  }
  return text.join('. ') + '.'
}

export { isBreedingBird, populationCategoryToLevel, populationInfo, migrationText }
