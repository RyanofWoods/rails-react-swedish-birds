export interface SpeciesDataState {
  species: Species[]
  families: Family[]
  orders: Order[]
  observations: ObservationDict
  filteredSpecies: Species[]
  filters: SpeciesFilters
  sorting: SpeciesSorting
  sortedSpecies: Species[]
  userSettings: UserSettings
}

export type Language = 'EN' | 'SE' | 'SC'

export type PopulationCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
// represents the amount of species - the inverse of populationCategory (but to 5)
// as 1 and 6 of populationCategory (breeding and non-breeding respectively) are the most common
export type PopulationLevel = 1 | 2 | 3 | 4 | 5

export type SpeciesScientificName = string
type SpeciesEnglishName = string
type SpeciesSwedishName = string

export type FamilyScientificName = string
export type OrderScientificName = string

export interface Species {
  scientificName: SpeciesScientificName
  englishName: SpeciesEnglishName
  swedishName: SpeciesSwedishName
  familyScientificName: FamilyScientificName
  orderScientificName: OrderScientificName
  details: string
  populationCategory: PopulationCategory
}

export interface ObservationDict {
  [speciesScientificName: SpeciesScientificName]: Observation
}
export interface Observation {
  observedAt: string | null
  note: string | null
}

export type SeenScope = 'all' | 'seen' | 'unseen'

export interface SpeciesFilters {
  searchScope: SpeciesScientificName[]
  seenScope: SeenScope
  orderScientificNameScope: string | null
  familyScientificNameScope: string | null
  searchValue: string
}

export interface SpeciesSorting {
  column: SpeciesColumn | null
  ordering: ColumnOrdering
}

export type SpeciesColumn = 'seen' | 'name' | 'population'
export type ColumnOrdering = 'asc' | 'desc'

export interface Family {
  scientificName: FamilyScientificName
  englishName: string
  swedishName: string
  orderScientificName: OrderScientificName
}

export interface Order {
  scientificName: OrderScientificName
  englishName: string
  swedishName: string
}

export interface UserSettings {
  primaryNameLanguage: Language
  secondaryNameLanguage: Language
}
