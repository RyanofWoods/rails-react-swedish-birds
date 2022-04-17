export interface State {
  birds: BirdWithOrWithoutObservation[]
  orders: Order[]
  filteredBirds: BirdWithOrWithoutObservation[]
  filters: BirdFilters
}

type PopulationCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type BirdScientificName = string
type BirdEnglishName = string
type BirdSwedishName = string

type FamilyScientificName = string
type OrderScientificName = string

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

export interface BirdFilters {
  searchScope: BirdScientificName[]
  seenScope: 'all' | 'seen' | 'unseen'
  orderScientificNameScope: string | null
  familyScientificNameScope: string | null
}

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
