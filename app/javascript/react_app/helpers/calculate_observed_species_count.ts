import { Species, ObservationDict } from '../types/speciesData'

const calculateObservedSpeciesCount = (species: Species[], observations: ObservationDict): number => {
  const observedSpeciesScientificNames = Object.keys(observations)

  return species.filter(singleSpecies => observedSpeciesScientificNames.includes(singleSpecies.scientificName)).length
}

export default calculateObservedSpeciesCount
