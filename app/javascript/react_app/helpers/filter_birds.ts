import { BirdFilters, BirdWithOrWithoutObservation } from '../types'

interface Options {
  birds: BirdWithOrWithoutObservation[]
  filters: BirdFilters
}

const filterBirds = ({ birds, filters }: Options): BirdWithOrWithoutObservation[] => {
  const { searchScope, seenScope, familyScientificNameScope, orderScientificNameScope } = filters
  if (filters.searchScope.length === 0 && filters.searchValue.length > 1) return []

  return birds.filter(bird => {
    if (searchScope.length > 0) {
      if (!searchScope.includes(bird.scientificName)) return false
    }

    if (seenScope !== 'all') {
      if (seenScope === 'seen' && !bird.seen) return false
      if (seenScope === 'unseen' && bird.seen) return false
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
