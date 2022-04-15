import { BirdWithOrWithoutObservation, BirdWithObservation, ScientificName } from './index'

export interface fetchBirdsResponse {
  birds: BirdWithOrWithoutObservation[]
}

export interface createObservationRequest {
  birdScientificName: ScientificName
  observedAt: string | 0
  note?: string | null
}

export interface createObservationResponse extends BirdWithObservation {}
