import { BirdWithOrWithoutObservation, BirdWithObservation, BirdScientificName } from './index'

export interface fetchBirdsResponse {
  birds: BirdWithOrWithoutObservation[]
}

export interface createObservationRequest {
  birdScientificName: BirdScientificName
  observedAt: string | 0
  note?: string | null
}

export interface createObservationResponse extends BirdWithObservation {}

export interface searchBirdsResponse {
  birds: BirdScientificName[]
}
