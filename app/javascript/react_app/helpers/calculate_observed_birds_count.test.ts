import { BirdWithOrWithoutObservation, ObservationDict } from '../types/birdData'
import calculateObservedBirdsCount from './calculate_observed_birds_count'

const birds: BirdWithOrWithoutObservation[] = [
  {
    scientificName: 'Tyto alba',
    englishName: 'Western Barn Owl',
    swedishName: 'Tornuggla',
    familyScientificName: 'Tytonidae',
    orderScientificName: 'Strigiformes',
    details: 'Hs 5',
    populationCategory: 5,
    seen: true,
    observation: {
      observedAt: '2022/04/15',
      note: null
    }
  },
  {
    scientificName: 'Strix aluco',
    englishName: 'Tawny Owl',
    swedishName: 'Kattuggla',
    familyScientificName: 'Strigidae',
    orderScientificName: 'Strigiformes',
    details: 'Hs 3',
    populationCategory: 3,
    seen: false,
    observation: undefined
  },
  {
    scientificName: 'Strix nebulosa',
    englishName: 'Great Grey Owl',
    swedishName: 'Lappuggla',
    familyScientificName: 'Strigidae',
    orderScientificName: 'Strigiformes',
    details: 'Hs 4-5',
    populationCategory: 5,
    seen: false,
    observation: undefined
  }
]

const observations: ObservationDict = {
  'Tyto alba': {
    observedAt: '2022/04/15',
    note: null
  }
}
test('when there are no birds or observations', () => {
  const actual = calculateObservedBirdsCount([], {})
  expect(actual).toEqual(0)
})

test('when there are 3 birds and 1 observation', () => {
  const actual = calculateObservedBirdsCount(birds, observations)
  expect(actual).toEqual(1)
})