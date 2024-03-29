import React from 'react'
import { updateSorting } from '../../features/speciesSlice'
import { capitalize } from '../../helpers/string_helpers'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { SpeciesColumn } from '../../types/speciesData'
import SortIcon from '../shared/sort_icon'

interface ColumnOption {
  column: SpeciesColumn
  classes: string
}

const SpeciesListHeader: React.FC = () => {
  const columnOptions: ColumnOption[] = [
    {
      column: 'seen',
      classes: 'species-date'
    },
    {
      column: 'name',
      classes: 'species-names'
    },
    {
      column: 'population',
      classes: 'population-relative'
    }
  ]
  const sorting = useAppSelector(state => state.speciesData.sorting)
  const dispatch = useAppDispatch()

  const onChangeHandler = (column: SpeciesColumn): void => {
    dispatch(updateSorting(column))
  }

  const columnText = (column: SpeciesColumn): JSX.Element => {
    const ordering = (sorting.column === column) ? sorting.ordering : null

    return (
      <>
        <p className='bold-600 mr-2'>{capitalize(column)}</p>
        <div>
          <SortIcon order={ordering} />
        </div>
      </>
    )
  }

  return (
    <div id='sorting-header' className='species-card'>
      {
        columnOptions.map(({ column, classes }) => (
          <button key={column} className={classes} onClick={() => onChangeHandler(column)}>
            {columnText(column)}
          </button>
        ))
      }
    </div>
  )
}

export default SpeciesListHeader
