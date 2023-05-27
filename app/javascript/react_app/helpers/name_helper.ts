import { Species, Family, Order, Language } from '../types/birdData'

const getNameAttribute = (object: Species | Family | Order, language: Language): string => {
  switch (language) {
    case 'EN':
      return object.englishName
    case 'SE':
      return object.swedishName
    case 'SC':
      return object.scientificName
    default:
      return ''
  }
}

export default getNameAttribute
