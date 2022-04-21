import React, { useEffect, useState } from 'react'

import { updateFilters } from '../../features/birdSlice'
import { useAppDispatch } from '../../hooks'
import { Family, Order, FamilyScientificName, OrderScientificName } from '../../types'
import Select, { Option } from '../shared/select'

interface FamilyAndOrderFilterProps {
  families: Family[]
  orders: Order[]
}

const FamilyAndOrderFilter: React.FC<FamilyAndOrderFilterProps> = ({ families, orders }) => {
  const dispatch = useAppDispatch()
  const [filteredFamilies, setFilteredFamilies] = useState(families)

  useEffect(() => {
    setFilteredFamilies(families)
  }, [families])

  const handleOrderChange = (value: OrderScientificName | null): void => {
    const orderFamilies = (): Family[] => (
      families.filter(family => family.orderScientificName === value)
    )
    const newFamilies = (value === null) ? families : orderFamilies

    setFilteredFamilies(newFamilies)
    void dispatch(updateFilters({
      orderScientificNameScope: value,
      familyScientificNameScope: null
    }))
  }

  const handleFamilyChange = (value: FamilyScientificName | null): void => {
    void dispatch(updateFilters({ familyScientificNameScope: value }))
  }

  const tranformToOptions = (familiesOrOrders: Family[] | Order[]): Option[] => (
    familiesOrOrders.map(element => {
      return {
        value: element.scientificName,
        text: element.englishName
      }
    })
  )

  return (
    <>
      <Select
        label='Orders'
        id='select-order'
        ariaLabel='Select order to filter the birds by'
        options={tranformToOptions(orders)}
        defaultText='Orders'
        handleChange={handleOrderChange}
      />
      <Select
        label='Families'
        id='select-family'
        ariaLabel='Select a family to filter the birds by'
        options={tranformToOptions(filteredFamilies)}
        defaultText='Families'
        handleChange={handleFamilyChange}
      />
    </>
  )
}

export default FamilyAndOrderFilter
