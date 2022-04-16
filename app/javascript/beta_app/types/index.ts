export interface State {
  birds: BirdWithOrWithoutObservation[]
}

type PopulationCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type BirdScientificName = string
type BirdEnglishName = string
type BirdSwedishName = string

type familyScientificName = string
type orderScientificName = string

interface Bird {
  scientificName: BirdScientificName
  englishName: BirdEnglishName
  swedishName: BirdSwedishName
  familyScientificName: familyScientificName
  orderScientificName: orderScientificName
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

interface BirdWithoutObservation extends Bird {
  seen: false
  observation: undefined
}
