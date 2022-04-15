export interface State {
  birds: BirdWithOrWithoutObservation[]
}

type PopulationCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ScientificName = string
type EnglishName = string
type SwedishName = string

interface Bird {
  scientificName: ScientificName
  englishName: EnglishName
  swedishName: SwedishName
  details: string
  populationCategory: PopulationCategory
}

export type BirdWithOrWithoutObservation = BirdWithObservation | BirdWithoutObservation

interface Observation {
  observedAt: string
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
