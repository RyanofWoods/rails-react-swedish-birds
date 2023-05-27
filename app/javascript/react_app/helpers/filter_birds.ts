import { SpeciesFilters, Species, ObservationDict } from '../types/birdData'

interface Options {
  birds: Species[]
  observations: ObservationDict
  filters: SpeciesFilters
}

const filterBirds = ({ birds, observations, filters }: Options): Species[] => {
  const { searchScope, seenScope, familyScientificNameScope, orderScientificNameScope } = filters
  if (filters.searchScope.length === 0 && filters.searchValue.length > 1) return []

  return birds.filter(bird => {
    if (searchScope.length > 0) {
      if (!searchScope.includes(bird.scientificName)) return false
    }

    const observation = observations[bird.scientificName]
    if (seenScope !== 'all') {
      if (seenScope === 'seen' && observation === undefined) return false
      if (seenScope === 'unseen' && observation !== undefined) return false
    }

    if (familyScientificNameScope !== null) {
      if (bird.familyScientificName !== familyScientificNameScope) return false
    }

    if (orderScientificNameScope !== null) {
      if (bird.orderScientificName !== orderScientificNameScope) return false
    }
    return true
  })
}

export default filterBirds
