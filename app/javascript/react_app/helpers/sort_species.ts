import { Species, SpeciesSorting, ObservationDict, Observation } from '../types/speciesData'
import getNameAttribute from './name_helper'
import { compareString } from './sort_helpers'

interface SortSpeciesOptions {
  species: Species[]
  observations: ObservationDict
  sorting: SpeciesSorting
  primaryNameLanguage: 'EN' | 'SE' | 'SC'
}

const observationToNumber = (observation: Observation): number => {
  if (observation === undefined) return Infinity

  if (observation.observedAt === null) return 0

  return Date.parse(observation.observedAt)
}

export const sortSpecies = ({ species, observations, sorting, primaryNameLanguage }: SortSpeciesOptions): Species[] => {
  const sort = (speciesToSort: Species[]): Species[] => {
    switch (sorting.column) {
      case 'seen':
        return speciesToSort.sort((a, b) => {
          const aObservation = observations[a.scientificName]
          const bObservation = observations[b.scientificName]
          return observationToNumber(aObservation) - observationToNumber(bObservation)
        })
      case 'name':
        return speciesToSort.sort((a, b) =>
          compareString(
            getNameAttribute(a, primaryNameLanguage),
            getNameAttribute(b, primaryNameLanguage)
          )
        )
      case 'population':
        return speciesToSort.sort((a, b) => a.populationCategory - b.populationCategory)
      default:
        return speciesToSort
    }
  }

  const speciesCopy = [...species]
  const sortedSpecies = sort(speciesCopy)
  return (sorting.ordering === 'asc') ? sortedSpecies : sortedSpecies.reverse()
}
