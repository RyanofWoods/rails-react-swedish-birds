import { Species, ObservationDict } from '../types/speciesData'
import calculateObservedSpeciesCount from './calculate_observed_species_count'

const species: Species[] = [
  {
    scientificName: 'Tyto alba',
    englishName: 'Western Barn Owl',
    swedishName: 'Tornuggla',
    familyScientificName: 'Tytonidae',
    orderScientificName: 'Strigiformes',
    details: 'Hs 5',
    populationCategory: 5
  },
  {
    scientificName: 'Strix aluco',
    englishName: 'Tawny Owl',
    swedishName: 'Kattuggla',
    familyScientificName: 'Strigidae',
    orderScientificName: 'Strigiformes',
    details: 'Hs 3',
    populationCategory: 3
  },
  {
    scientificName: 'Strix nebulosa',
    englishName: 'Great Grey Owl',
    swedishName: 'Lappuggla',
    familyScientificName: 'Strigidae',
    orderScientificName: 'Strigiformes',
    details: 'Hs 4-5',
    populationCategory: 5
  }
]

const observations: ObservationDict = {
  'Tyto alba': {
    observedAt: '2022/04/15',
    note: null
  }
}
test('when there are no species or observations', () => {
  const actual = calculateObservedSpeciesCount([], {})
  expect(actual).toEqual(0)
})

test('when there are 3 species and 1 observation', () => {
  const actual = calculateObservedSpeciesCount(species, observations)
  expect(actual).toEqual(1)
})
