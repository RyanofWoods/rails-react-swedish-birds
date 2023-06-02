import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'

import { ColumnOrdering } from '../../types/speciesData'

interface SortIconProps {
  order: ColumnOrdering | null
}

const SortIcon: React.FC<SortIconProps> = ({ order }) => {
  switch (order) {
    case 'asc':
      return <FontAwesomeIcon icon={faSortUp} />
    case 'desc':
      return <FontAwesomeIcon icon={faSortDown} />
    default:
      return <FontAwesomeIcon icon={faSort} />
  }
}

export default SortIcon
