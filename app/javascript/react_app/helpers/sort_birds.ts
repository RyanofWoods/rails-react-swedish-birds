import { Bird, BirdSorting, ObservationDict, Observation } from '../types/birdData'
import getNameAttribute from './name_helper'
import { compareString } from './sort_helpers'

interface SortBirdsOptions {
  birds: Bird[]
  observations: ObservationDict
  sorting: BirdSorting
  primaryNameLanguage: 'EN' | 'SE' | 'SC'
}

const observationToNumber = (observation: Observation): number => {
  if (observation === undefined) return Infinity

  if (observation.observedAt === null) return 0

  return Date.parse(observation.observedAt)
}

export const sortBirds = ({ birds, observations, sorting, primaryNameLanguage }: SortBirdsOptions): Bird[] => {
  const sort = (birdsToSort: Bird[]): Bird[] => {
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
  const sortedBirds = sort(birdsCopy)
  return (sorting.ordering === 'asc') ? sortedBirds : sortedBirds.reverse()
}
