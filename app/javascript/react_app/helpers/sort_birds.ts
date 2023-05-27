import { Species, SpeciesSorting, ObservationDict, Observation } from '../types/speciesData'
import getNameAttribute from './name_helper'
import { compareString } from './sort_helpers'

interface SortBirdsOptions {
  birds: Species[]
  observations: ObservationDict
  sorting: SpeciesSorting
  primaryNameLanguage: 'EN' | 'SE' | 'SC'
}

const observationToNumber = (observation: Observation): number => {
  if (observation === undefined) return Infinity

  if (observation.observedAt === null) return 0

  return Date.parse(observation.observedAt)
}

export const sortBirds = ({ birds, observations, sorting, primaryNameLanguage }: SortBirdsOptions): Species[] => {
  const sort = (birdsToSort: Species[]): Species[] => {
    switch (sorting.column) {
      case 'seen':
        return birdsToSort.sort((a, b) => {
          const aObservation = observations[a.scientificName]
          const bObservation = observations[b.scientificName]
          return observationToNumber(aObservation) - observationToNumber(bObservation)
        })
      case 'name':
        return birdsToSort.sort((a, b) =>
          compareString(
            getNameAttribute(a, primaryNameLanguage),
            getNameAttribute(b, primaryNameLanguage)
          )
        )
      case 'population':
        return birdsToSort.sort((a, b) => a.populationCategory - b.populationCategory)
      default:
        return birdsToSort
    }
  }

  const birdsCopy = [...birds]
  const sortedSpecies = sort(birdsCopy)
  return (sorting.ordering === 'asc') ? sortedSpecies : sortedSpecies.reverse()
}
