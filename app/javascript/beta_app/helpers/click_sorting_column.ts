import { BirdColumn, BirdSorting } from '../types'

interface ClickSortingColumnOptions {
  sorting: BirdSorting
  clickedHeader: BirdColumn
}

const clickSortingColumn = ({ sorting, clickedHeader }: ClickSortingColumnOptions): BirdSorting => {
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
