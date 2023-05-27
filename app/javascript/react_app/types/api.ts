import { Bird, BirdScientificName, ObservationDict, Order, Family, Observation } from './birdData'

export interface fetchSpeciesResponse {
  species: Bird[]
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

export interface createObservationResponse extends Observation {}
export interface editObservationResponse extends Observation {}

export interface searchBirdsResponse {
  species: BirdScientificName[]
}

export interface isUserLoggedInResponse {
  isLoggedIn: boolean
}
