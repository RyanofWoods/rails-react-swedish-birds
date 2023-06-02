import { SpeciesFilters, Species } from '../types/speciesData'
import { barnOwl, blueTit, greatTit, tawnyOwl } from './species_fixtures_test'
import observations from './observations.mock'
import filterSpecies from './filter_species'

const initialFilters: SpeciesFilters = {
  searchScope: [],
  seenScope: 'all',
  orderScientificNameScope: null,
  familyScientificNameScope: null,
  searchValue: ''
}

const initialSpecies: Species[] = [
  barnOwl,
  tawnyOwl,
  blueTit,
  greatTit
]

let filters = { ...initialFilters }
let species = initialSpecies

beforeEach(() => {
  filters = { ...initialFilters }
  species = initialSpecies
})

test('when there are no filters it returns all the species', () => {
  const expected = initialSpecies
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})

test('when the searchScope is not empty, it filters the species appropriately', () => {
  filters.searchScope = ['Cyanistes caeruleus', 'Parus major']

  const expected = [blueTit, greatTit]
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})

test('when the searchScope is empty because the search query results in no species, it returns no species', () => {
  filters.searchScope = []
  filters.searchValue = 'no species has this name'

  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual([])
})

test('when the searchScope is empty because the trigram search return nothing on one character searches, it returns all the species', () => {
  filters.searchScope = []
  filters.searchValue = 't'

  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(species)
})

test('when seenScope is "seen" it returns only seen species', () => {
  filters.seenScope = 'seen'

  const expected = [tawnyOwl, blueTit, greatTit]
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})

test('when seenScope is "unseen" it returns only seen species', () => {
  filters.seenScope = 'unseen'

  const expected = [barnOwl]
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName is set, but familyScientificName is not, it filters by the order', () => {
  filters.orderScientificNameScope = 'Strigiformes'

  const expected = [barnOwl, tawnyOwl]
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName and familyScientificName are set, it filters by the family', () => {
  filters.orderScientificNameScope = 'Strigiformes'
  filters.familyScientificNameScope = 'Tytonidae'

  const expected = [barnOwl]
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName is not set, but familyScientificName is, it filters by the family', () => {
  filters.familyScientificNameScope = 'Strigidae'

  const expected = [tawnyOwl]
  const actual = filterSpecies({ species, observations, filters })
  expect(actual).toEqual(expected)
})
