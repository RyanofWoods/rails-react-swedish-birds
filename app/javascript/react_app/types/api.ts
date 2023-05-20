import { BirdWithOrWithoutObservation, BirdWithObservation, BirdScientificName, ObservationDict, Order, Family } from './birdData'

export interface fetchBirdsResponse {
  birds: BirdWithOrWithoutObservation[]
}

export interface fetchFamiliesResponse {
  families: Family[]
}

export interface fetchOrdersResponse {
  orders: Order[]
}

export interface fetchObservationsResponse {
  observations: ObservationDict
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

export interface isUserLoggedInResponse {
  isLoggedIn: boolean
}
