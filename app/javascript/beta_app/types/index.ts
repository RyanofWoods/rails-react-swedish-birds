export interface State {
  birds: BirdWithOrWithoutObservation[]
  families: Family[]
  orders: Order[]
  filteredBirds: BirdWithOrWithoutObservation[]
  filters: BirdFilters
  sorting: BirdSorting
  sortedBirds: BirdWithOrWithoutObservation[]
  userSettings: UserSettings
}

export type Language = 'EN' | 'SE' | 'SC'

export type PopulationCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

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

interface Observation {
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
}

export interface BirdSorting {
  column: BirdColumn | null
  ordering: ColumnOrdering
}

export type BirdColumn = 'seen' | 'name' | 'population'
type ColumnOrdering = 'asc' | 'desc'

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
