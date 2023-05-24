import { BirdFilters, BirdWithOrWithoutObservation } from '../types/birdData'
import { barnOwl, blueTit, greatTit, tawnyOwl } from './bird_fixtures_test'
import observations from './observations.mock'
import filterBirds from './filter_birds'

const initialFilters: BirdFilters = {
  searchScope: [],
  seenScope: 'all',
  orderScientificNameScope: null,
  familyScientificNameScope: null,
  searchValue: ''
}

const initialBirds: BirdWithOrWithoutObservation[] = [
  barnOwl,
  tawnyOwl,
  blueTit,
  greatTit
]

let filters = { ...initialFilters }
let birds = initialBirds

beforeEach(() => {
  filters = { ...initialFilters }
  birds = initialBirds
})

test('when there are no filters it returns all the birds', () => {
  const expected = initialBirds
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})

test('when the searchScope is not empty, it filters the birds appropriately', () => {
  filters.searchScope = ['Cyanistes caeruleus', 'Parus major']

  const expected = [blueTit, greatTit]
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})

test('when the searchScope is empty because the search query results in no birds, it returns no birds', () => {
  filters.searchScope = []
  filters.searchValue = 'no bird has this name'

  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual([])
})

test('when the searchScope is empty because the trigram search return nothing on one character searches, it returns all the birds', () => {
  filters.searchScope = []
  filters.searchValue = 't'

  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(birds)
})

test('when seenScope is "seen" it returns only seen birds', () => {
  filters.seenScope = 'seen'

  const expected = [tawnyOwl, blueTit, greatTit]
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})

test('when seenScope is "unseen" it returns only seen birds', () => {
  filters.seenScope = 'unseen'

  const expected = [barnOwl]
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName is set, but familyScientificName is not, it filters by the order', () => {
  filters.orderScientificNameScope = 'Strigiformes'

  const expected = [barnOwl, tawnyOwl]
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName and familyScientificName are set, it filters by the family', () => {
  filters.orderScientificNameScope = 'Strigiformes'
  filters.familyScientificNameScope = 'Tytonidae'

  const expected = [barnOwl]
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName is not set, but familyScientificName is, it filters by the family', () => {
  filters.familyScientificNameScope = 'Strigidae'

  const expected = [tawnyOwl]
  const actual = filterBirds({ birds, observations, filters })
  expect(actual).toEqual(expected)
})
