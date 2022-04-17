import { BirdWithOrWithoutObservation, BirdWithObservation, BirdWithoutObservation, BirdFilters } from '../types'
import filterBirds from './filter_birds'

const initialFilters: BirdFilters = {
  searchScope: [],
  seenScope: 'all',
  orderScientificNameScope: null,
  familyScientificNameScope: null
}

const barnOwl: BirdWithoutObservation = {
  scientificName: 'Tyto alba',
  englishName: 'Western Barn Owl',
  swedishName: 'Tornuggla',
  familyScientificName: 'Tytonidae',
  orderScientificName: 'Strigiformes',
  details: 'Hs 5',
  populationCategory: 5,
  seen: false,
  observation: undefined
}

const tawnyOwl: BirdWithObservation = {
  scientificName: 'Strix aluco',
  englishName: 'Tawny Owl',
  swedishName: 'Kattuggla',
  familyScientificName: 'Strigidae',
  orderScientificName: 'Strigiformes',
  details: 'Hs 3',
  populationCategory: 3,
  seen: true,
  observation: {
    observedAt: '2022/04/15',
    note: null
  }
}

const blueTit: BirdWithObservation = {
  scientificName: 'Cyanistes caeruleus',
  englishName: 'Eurasian Blue Tit',
  swedishName: 'Blåmes',
  familyScientificName: 'Paridae',
  orderScientificName: 'Passeriformes',
  details: 'Hs (f) 2',
  populationCategory: 2,
  seen: true,
  observation: {
    observedAt: '2022/01/10',
    note: 'Note.'
  }
}

const greatTit: BirdWithObservation = {
  scientificName: 'Parus major',
  englishName: 'Great Tit',
  swedishName: 'Talgoxe',
  familyScientificName: 'Paridae',
  orderScientificName: 'Passeriformes',
  details: 'Hs (f) 1',
  populationCategory: 1,
  seen: true,
  observation: {
    observedAt: null,
    note: 'Lots of notes.'
  }
}

const initialBirds: BirdWithOrWithoutObservation[] = [
  barnOwl,
  tawnyOwl,
  blueTit,
  greatTit
]

let filters = { ...initialFilters }
let birds = [...initialBirds]

beforeEach(() => {
  filters = { ...initialFilters }
  birds = [...initialBirds]
})

test('when there are no filters it returns all the birds', () => {
  const expected = initialBirds
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})

test('when the searchScope is not empty, it filters the birds appropriately', () => {
  filters.searchScope = ['Cyanistes caeruleus', 'Parus major']

  const expected = [blueTit, greatTit]
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})

test('when seenScope is "seen" it returns only seen birds', () => {
  filters.seenScope = 'seen'

  const expected = [tawnyOwl, blueTit, greatTit]
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})

test('when seenScope is "unseen" it returns only seen birds', () => {
  filters.seenScope = 'unseen'

  const expected = [barnOwl]
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName is set, but familyScientificName is not, it filters by the order', () => {
  filters.orderScientificNameScope = 'Strigiformes'

  const expected = [barnOwl, tawnyOwl]
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName and familyScientificName are set, it filters by the family', () => {
  filters.orderScientificNameScope = 'Strigiformes'
  filters.familyScientificNameScope = 'Tytonidae'

  const expected = [barnOwl]
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})

test('when orderScientificName is not set, but familyScientificName is, it filters by the family', () => {
  filters.familyScientificNameScope = 'Strigidae'

  const expected = [tawnyOwl]
  const actual = filterBirds({ birds, filters })
  expect(actual).toEqual(expected)
})
