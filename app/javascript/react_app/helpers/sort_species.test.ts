import { SpeciesSorting, Species, Language } from '../types/speciesData'
import { barnOwl, tawnyOwl, greatGreyOwl, blueTit, greatTit } from './species_fixtures_test'
import observations from './observations.mock'
import { sortSpecies } from './sort_species'

const initialSorting: SpeciesSorting = {
  column: null,
  ordering: 'asc'
}

const initialSpecies: Species[] = [
  barnOwl,
  tawnyOwl,
  blueTit,
  greatTit,
  greatGreyOwl
]

const initialPrimaryNameLanguage = 'EN'

let primaryNameLanguage: Language = initialPrimaryNameLanguage
let sorting = { ...initialSorting }
let species = initialSpecies

beforeEach(() => {
  primaryNameLanguage = initialPrimaryNameLanguage
  sorting = { ...initialSorting }
  species = initialSpecies
})

test('when there are no sorting it returns all the species intact', () => {
  const expected = initialSpecies
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is seen and ordering is asc', () => {
  sorting.column = 'seen'
  sorting.ordering = 'asc'

  const expected = [greatTit, greatGreyOwl, blueTit, tawnyOwl, barnOwl]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is seen and ordering is desc', () => {
  sorting.column = 'seen'
  sorting.ordering = 'desc'

  const expected = [barnOwl, tawnyOwl, blueTit, greatGreyOwl, greatTit]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is asc and primaryNameLanguage is EN', () => {
  sorting.column = 'name'
  sorting.ordering = 'asc'
  primaryNameLanguage = 'EN'

  const expected = [blueTit, greatGreyOwl, greatTit, tawnyOwl, barnOwl]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is desc and primaryNameLanguage is EN', () => {
  sorting.column = 'name'
  sorting.ordering = 'desc'
  primaryNameLanguage = 'EN'

  const expected = [barnOwl, tawnyOwl, greatTit, greatGreyOwl, blueTit]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is asc and primaryNameLanguage is SE', () => {
  sorting.column = 'name'
  sorting.ordering = 'asc'
  primaryNameLanguage = 'SE'

  const expected = [blueTit, tawnyOwl, greatGreyOwl, greatTit, barnOwl]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is desc and primaryNameLanguage is SE', () => {
  sorting.column = 'name'
  sorting.ordering = 'desc'
  primaryNameLanguage = 'SE'

  const expected = [barnOwl, greatTit, greatGreyOwl, tawnyOwl, blueTit]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is asc and primaryNameLanguage is SC', () => {
  sorting.column = 'name'
  sorting.ordering = 'asc'
  primaryNameLanguage = 'SC'

  const expected = [blueTit, greatTit, tawnyOwl, greatGreyOwl, barnOwl]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is name, ordering is desc and primaryNameLanguage is SC', () => {
  sorting.column = 'name'
  sorting.ordering = 'desc'
  primaryNameLanguage = 'SC'

  const expected = [barnOwl, greatGreyOwl, tawnyOwl, greatTit, blueTit]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is population and ordering is asc', () => {
  sorting.column = 'population'
  sorting.ordering = 'asc'

  const expected = [greatTit, blueTit, tawnyOwl, barnOwl, greatGreyOwl]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('when column is population and ordering is desc', () => {
  sorting.column = 'population'
  sorting.ordering = 'desc'

  const expected = [greatGreyOwl, barnOwl, tawnyOwl, blueTit, greatTit]
  const actual = sortSpecies({ species, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
})

test('it does not mutate the original array of species', () => {
  const originalSpecies = [greatGreyOwl, barnOwl, tawnyOwl]
  const originalCopy = [...originalSpecies]
  sorting.column = 'name'
  sorting.ordering = 'desc'

  const expected = [barnOwl, tawnyOwl, greatGreyOwl]
  const actual = sortSpecies({ species: originalSpecies, observations, sorting, primaryNameLanguage })
  expect(actual).toEqual(expected)
  expect(originalSpecies).toEqual(originalCopy)
})
