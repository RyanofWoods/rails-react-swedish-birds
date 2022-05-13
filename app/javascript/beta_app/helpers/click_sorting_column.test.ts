import { BirdSorting } from '../types'
import clickSortingColumn from './click_sorting_column'

const initialSorting: BirdSorting = {
  column: null,
  ordering: 'asc'
}

let sorting = initialSorting

beforeEach(() => {
  sorting = initialSorting
})

test('when clicked column is different from the existing column, it sets it to that column ascending', () => {
  let actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'seen' })
  let expected = { column: 'seen', ordering: 'asc' }
  expect(actual).toEqual(expected)

  actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'name' })
  expected = { column: 'name', ordering: 'asc' }
  expect(actual).toEqual(expected)

  actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'population' })
  expected = { column: 'population', ordering: 'asc' }
  expect(actual).toEqual(expected)
})

test('when clicked column is the same from the existing column, it increments ascending to descending', () => {
  sorting = { column: 'seen', ordering: 'asc' }
  let actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'seen' })
  let expected = { column: 'seen', ordering: 'desc' }
  expect(actual).toEqual(expected)

  sorting = { column: 'name', ordering: 'asc' }
  actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'name' })
  expected = { column: 'name', ordering: 'desc' }
  expect(actual).toEqual(expected)

  sorting = { column: 'population', ordering: 'asc' }
  actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'population' })
  expected = { column: 'population', ordering: 'desc' }
  expect(actual).toEqual(expected)
})

test('when clicked column is the same from the existing column, it increments descending to null ascending', () => {
  sorting = { column: 'seen', ordering: 'desc' }
  let actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'seen' })
  let expected = { column: null, ordering: 'asc' }
  expect(actual).toEqual(expected)

  sorting = { column: 'name', ordering: 'desc' }
  actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'name' })
  expected = { column: null, ordering: 'asc' }
  expect(actual).toEqual(expected)

  sorting = { column: 'population', ordering: 'desc' }
  actual = clickSortingColumn({ sorting: sorting, clickedHeader: 'population' })
  expected = { column: null, ordering: 'asc' }
  expect(actual).toEqual(expected)
})
