import { SpeciesSorting, Species, Language } from '../types/speciesData'
import { barnOwl, tawnyOwl, greatGreyOwl, blueTit, greatTit } from './bird_fixtures_test'
import observations from './observations.mock'
import { sortBirds } from './sort_birds'

const initialSorting: SpeciesSorting = {
  column: null,
  ordering: 'asc'
}

const initialBirds: Species[] = [
  barnOwl,
  tawnyOwl,
  blueTit,
  greatTit,
  greatGreyOwl
]

const initialPrimaryNameLanguage = 'EN'

let primaryNameLanguage: Language = initialPrimaryNameLanguage
let sorting = { ...initialSorting }
let birds = initialBirds

beforeEach(() => {
  primaryNameLanguage = initialPrimaryNameLanguage
  sorting = { ...initialSorting }
  birds = initialBirds
})

test('when there are no sorting it returns all the birds intact', () => {
  const expected = initialBirds
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is seen and ordering is asc', () => {
  sorting.column = 'seen'
  sorting.ordering = 'asc'

  const expected = [greatTit, greatGreyOwl, blueTit, tawnyOwl, barnOwl]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is seen and ordering is desc', () => {
  sorting.column = 'seen'
  sorting.ordering = 'desc'

  const expected = [barnOwl, tawnyOwl, blueTit, greatGreyOwl, greatTit]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is asc and primaryNameLanguage is EN', () => {
  sorting.column = 'name'
  sorting.ordering = 'asc'
  primaryNameLanguage = 'EN'

  const expected = [blueTit, greatGreyOwl, greatTit, tawnyOwl, barnOwl]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is desc and primaryNameLanguage is EN', () => {
  sorting.column = 'name'
  sorting.ordering = 'desc'
  primaryNameLanguage = 'EN'

  const expected = [barnOwl, tawnyOwl, greatTit, greatGreyOwl, blueTit]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is asc and primaryNameLanguage is SE', () => {
  sorting.column = 'name'
  sorting.ordering = 'asc'
  primaryNameLanguage = 'SE'

  const expected = [blueTit, tawnyOwl, greatGreyOwl, greatTit, barnOwl]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is desc and primaryNameLanguage is SE', () => {
  sorting.column = 'name'
  sorting.ordering = 'desc'
  primaryNameLanguage = 'SE'

  const expected = [barnOwl, greatTit, greatGreyOwl, tawnyOwl, blueTit]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is asc and primaryNameLanguage is SC', () => {
  sorting.column = 'name'
  sorting.ordering = 'asc'
  primaryNameLanguage = 'SC'

  const expected = [blueTit, greatTit, tawnyOwl, greatGreyOwl, barnOwl]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is desc and primaryNameLanguage is SC', () => {
  sorting.column = 'name'
  sorting.ordering = 'desc'
  primaryNameLanguage = 'SC'

  const expected = [barnOwl, greatGreyOwl, tawnyOwl, greatTit, blueTit]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is population and ordering is asc', () => {
  sorting.column = 'population'
  sorting.ordering = 'asc'

  const expected = [greatTit, blueTit, tawnyOwl, barnOwl, greatGreyOwl]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is population and ordering is desc', () => {
  sorting.column = 'population'
  sorting.ordering = 'desc'

  const expected = [greatGreyOwl, barnOwl, tawnyOwl, blueTit, greatTit]
  const actual = sortBirds({ birds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('it does not mutate the original array of Birds', () => {
  const originalBirds = [greatGreyOwl, barnOwl, tawnyOwl]
  const originalCopy = [...originalBirds]
  sorting.column = 'name'
  sorting.ordering = 'desc'

  const expected = [barnOwl, tawnyOwl, greatGreyOwl]
  const actual = sortBirds({ birds: originalBirds, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
  expect(originalBirds).toEqual(originalCopy)
})
