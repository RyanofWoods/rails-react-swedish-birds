import { BirdWithoutObservation, BirdWithObservation } from '../types/birdData'

export const barnOwl: BirdWithoutObservation = {
  scientificName: 'Tyto alba',
  englishName: 'Western Barn Owl',
  swedishName: 'Tornuggla',
  familyScientificName: 'Tytonidae',
  orderScientificName: 'Strigiformes',
  details: 'Hs 5',
  populationCategory: 5,
  seen: false,
  observation: undefined
}

export const tawnyOwl: BirdWithObservation = {
  scientificName: 'Strix aluco',
  englishName: 'Tawny Owl',
  swedishName: 'Kattuggla',
  familyScientificName: 'Strigidae',
  orderScientificName: 'Strigiformes',
  details: 'Hs 3',
  populationCategory: 3,
  seen: true,
  observation: {
    observedAt: '2022/04/15',
    note: null
  }
}

export const greatGreyOwl: BirdWithObservation = {
  scientificName: 'Strix nebulosa',
  englishName: 'Great Grey Owl',
  swedishName: 'Lappuggla',
  familyScientificName: 'Strigidae',
  orderScientificName: 'Strigiformes',
  details: 'Hs 4-5',
  populationCategory: 5,
  seen: true,
  observation: {
    observedAt: '2021/12/24',
    note: 'Saw in a meadow perched on a small spruce tree.'
  }
}

export const blueTit: BirdWithObservation = {
  scientificName: 'Cyanistes caeruleus',
  englishName: 'Eurasian Blue Tit',
  swedishName: 'Blåmes',
  familyScientificName: 'Paridae',
  orderScientificName: 'Passeriformes',
  details: 'Hs (f) 2',
  populationCategory: 2,
  seen: true,
  observation: {
    observedAt: '2022/01/10',
    note: 'Note.'
  }
}

export const greatTit: BirdWithObservation = {
  scientificName: 'Parus major',
  englishName: 'Great Tit',
  swedishName: 'Talgoxe',
  familyScientificName: 'Paridae',
  orderScientificName: 'Passeriformes',
  details: 'Hs (f) 1',
  populationCategory: 1,
  seen: true,
  observation: {
    observedAt: null,
    note: 'Lots of notes.'
  }
}
