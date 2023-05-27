import { SpeciesColumn, SpeciesSorting } from '../types/birdData'

interface ClickSortingColumnOptions {
  sorting: SpeciesSorting
  clickedHeader: SpeciesColumn
}

const clickSortingColumn = ({ sorting, clickedHeader }: ClickSortingColumnOptions): SpeciesSorting => {
  if (sorting.column === clickedHeader) {
    if (sorting.ordering === 'asc') {
      return { ...sorting, ordering: 'desc' }
    } else {
      return { column: null, ordering: 'asc' }
    }
  } else {
    return { column: clickedHeader, ordering: 'asc' }
  }
}

export default clickSortingColumn
