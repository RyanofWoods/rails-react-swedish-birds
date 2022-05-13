import { BirdWithOrWithoutObservation, BirdSorting } from '../types'
import getNameAttribute from './name_helper'

interface SortBirdsOptions {
  birds: BirdWithOrWithoutObservation[]
  sorting: BirdSorting
  primaryNameLanguage: 'EN' | 'SE' | 'SC'
}

const BirdSeenToNumber = (bird: BirdWithOrWithoutObservation): number => {
  if (!bird.seen) return Infinity

  if (bird.observation.observedAt === null) return 0

  return Date.parse(bird.observation.observedAt)
}

const compareString = (a: string, b: string): -1 | 0 | 1 => {
  if (a === b) return 0

  return (a < b) ? -1 : 1
}

export const sortBirds = ({ birds, sorting, primaryNameLanguage }: SortBirdsOptions): BirdWithOrWithoutObservation[] => {
  const sort = (birdsToSort: BirdWithOrWithoutObservation[]): BirdWithOrWithoutObservation[] => {
    switch (sorting.column) {
      case 'seen':
        return birdsToSort.sort((a, b) => BirdSeenToNumber(a) - BirdSeenToNumber(b))
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
