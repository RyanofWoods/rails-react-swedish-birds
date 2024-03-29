import { SpeciesFilters, Species, ObservationDict } from '../types/speciesData'

interface Options {
  species: Species[]
  observations: ObservationDict
  filters: SpeciesFilters
}

const filterSpecies = ({ species, observations, filters }: Options): Species[] => {
  const { searchScope, seenScope, familyScientificNameScope, orderScientificNameScope } = filters
  if (filters.searchScope.length === 0 && filters.searchValue.length > 1) return []

  return species.filter(speci => {
    if (searchScope.length > 0) {
      if (!searchScope.includes(speci.scientificName)) return false
    }

    const observation = observations[speci.scientificName]
    if (seenScope !== 'all') {
      if (seenScope === 'seen' && observation === undefined) return false
      if (seenScope === 'unseen' && observation !== undefined) return false
    }

    if (familyScientificNameScope !== null) {
      if (speci.familyScientificName !== familyScientificNameScope) return false
    }

    if (orderScientificNameScope !== null) {
      if (speci.orderScientificName !== orderScientificNameScope) return false
    }
    return true
  })
}

export default filterSpecies
