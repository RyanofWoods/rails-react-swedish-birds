export interface BirdDataState {
  birds: BirdWithOrWithoutObservation[]
  families: Family[]
  orders: Order[]
  observations: ObservationDict
  filteredBirds: BirdWithOrWithoutObservation[]
  filters: BirdFilters
  sorting: BirdSorting
  sortedBirds: BirdWithOrWithoutObservation[]
  userSettings: UserSettings
}

export type Language = 'EN' | 'SE' | 'SC'

export type PopulationCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
// represents the amount of birds - the inverse of populationCategory (but to 5)
// as 1 and 6 of populationCategory (breeding and non-breeding respectively) are the most common
export type PopulationLevel = 1 | 2 | 3 | 4 | 5

export type BirdScientificName = string
type BirdEnglishName = string
type BirdSwedishName = string

export type FamilyScientificName = string
export type OrderScientificName = string

interface Bird {
  scientificName: BirdScientificName
  englishName: BirdEnglishName
  swedishName: BirdSwedishName
  familyScientificName: FamilyScientificName
  orderScientificName: OrderScientificName
  details: string
  populationCategory: PopulationCategory
}

export type BirdWithOrWithoutObservation = BirdWithObservation | BirdWithoutObservation

export interface ObservationDict {
  [birdScientificName: BirdScientificName]: Observation
}
export interface Observation {
  observedAt: string | null
  note: string | null
}

export interface BirdWithObservation extends Bird {
  seen: true
  observation: Observation
}

export interface BirdWithoutObservation extends Bird {
  seen: false
  observation: undefined
}

export type SeenScope = 'all' | 'seen' | 'unseen'

export interface BirdFilters {
  searchScope: BirdScientificName[]
  seenScope: SeenScope
  orderScientificNameScope: string | null
  familyScientificNameScope: string | null
  searchValue: string
}

export interface BirdSorting {
  column: BirdColumn | null
  ordering: ColumnOrdering
}

export type BirdColumn = 'seen' | 'name' | 'population'
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
