import { Bird, Family, Order, Language } from '../types/birdData'

const getNameAttribute = (object: Bird | Family | Order, language: Language): string => {
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
