import React, { useEffect, useState } from 'react'

import { updateFilters } from '../../features/speciesSlice'
import getNameAttribute from '../../helpers/name_helper'
import { useAppDispatch } from '../../hooks'
import { Family, Order, FamilyScientificName, OrderScientificName, UserSettings } from '../../types/speciesData'
import Select, { Option } from '../shared/select'

interface FamilyAndOrderFilterProps {
  families: Family[]
  orders: Order[]
  userSettings: UserSettings
  selectedOrderOption: string | null
  selectedFamilyOption: string | null
}

const FamilyAndOrderFilter: React.FC<FamilyAndOrderFilterProps> = (props) => {
  const { families, orders, userSettings, selectedOrderOption, selectedFamilyOption } = props

  const dispatch = useAppDispatch()
  const [filteredFamilies, setFilteredFamilies] = useState(families)

  const updateFamiliesBySelectedOrder = (): void => {
    const orderFamilies = (): Family[] => (
      families.filter(family => family.orderScientificName === selectedOrderOption)
    )
    const newFamilies = (selectedOrderOption === null) ? families : orderFamilies

    setFilteredFamilies(newFamilies)
  }

  useEffect(() => {
    setFilteredFamilies(families)
  }, [families])

  useEffect(() => {
    updateFamiliesBySelectedOrder()
  }, [selectedOrderOption])

  const handleOrderChange = (value: OrderScientificName | null): void => {
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
        text: getNameAttribute(element, userSettings.primaryNameLanguage)
      }
    })
  )

  return (
    <div id='filter-selects'>
      <Select
        id='select-order'
        ariaLabel='Select order to filter the birds by'
        options={tranformToOptions(orders)}
        defaultText='Orders'
        handleChange={handleOrderChange}
        selectedValue={selectedOrderOption}
      />
      <Select
        id='select-family'
        ariaLabel='Select a family to filter the birds by'
        options={tranformToOptions(filteredFamilies)}
        defaultText='Families'
        handleChange={handleFamilyChange}
        selectedValue={selectedFamilyOption}
      />
    </div>
  )
}

export default FamilyAndOrderFilter
