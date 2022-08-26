import { populationCategoryToLevel } from './population'

test('populationCategoryToLevel when given a populationCategory of 1', () => {
  const populationCategory = 1
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 5
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 2', () => {
  const populationCategory = 2
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 4
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 3', () => {
  const populationCategory = 3
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 3
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 4', () => {
  const populationCategory = 4
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 2
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 5', () => {
  const populationCategory = 5
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 1
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 6', () => {
  const populationCategory = 6
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 5
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 7', () => {
  const populationCategory = 7
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 4
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 8', () => {
  const populationCategory = 8
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 3
  expect(actual).toEqual(expected)
})

test('populationCategoryToLevel when given a populationCategory of 9', () => {
  const populationCategory = 9
  const actual = populationCategoryToLevel(populationCategory)
  const expected = 2
  expect(actual).toEqual(expected)
})
