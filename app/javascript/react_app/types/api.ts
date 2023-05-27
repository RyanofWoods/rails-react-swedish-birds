import { Species, SpeciesScientificName, ObservationDict, Order, Family, Observation } from './birdData'

export interface fetchSpeciesResponse {
  species: Species[]
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
  speciesScientificName: SpeciesScientificName
  observedAt: string | 0
  note?: string | null
}
export interface editObservationRequest {
  speciesScientificName: SpeciesScientificName
  observedAt?: string | 0
  note?: string | null
}

export interface createObservationResponse extends Observation {}
export interface editObservationResponse extends Observation {}

export interface searchSpeciesResponse {
  species: SpeciesScientificName[]
}

export interface isUserLoggedInResponse {
  isLoggedIn: boolean
}
