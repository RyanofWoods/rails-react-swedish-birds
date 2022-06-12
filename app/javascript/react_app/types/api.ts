import { BirdWithOrWithoutObservation, BirdWithObservation, BirdScientificName, Order, Family } from './index'

export interface fetchBirdsResponse {
  birds: BirdWithOrWithoutObservation[]
}

export interface fetchFamiliesResponse {
  families: Family[]
}

export interface fetchOrdersResponse {
  orders: Order[]
}

export interface createObservationRequest {
  birdScientificName: BirdScientificName
  observedAt: string | 0
  note?: string | null
}
export interface editObservationRequest {
  birdScientificName: BirdScientificName
  observedAt?: string | 0
  note?: string | null
}

export interface createObservationResponse extends BirdWithObservation {}
export interface editObservationResponse extends BirdWithObservation {}

export interface searchBirdsResponse {
  birds: BirdScientificName[]
}
