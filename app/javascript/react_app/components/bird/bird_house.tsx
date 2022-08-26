import React from 'react'

import { isBreedingBird } from '../../helpers/population'

interface BirdHouseProps {
  population: number
}

const BirdHouse: React.FC<BirdHouseProps> = ({ population }) => {
  return (
    <div className='house-container'>
      <svg width='35' height='35' viewBox='0 0 35 35' xmlns='http://www.w3.org/2000/svg'>
        <rect width='35' height='35' rx='4' className={isBreedingBird(population) ? 'house-bg-breeding' : 'house-bg-occasional'} />
        <path d='M17.7833 4.64155C17.6161 4.4743 17.3449 4.4743 17.1777 4.64155L6.8996 14.9196C6.73236 15.0869 6.73236 15.358 6.8996 15.5253L8.61262 17.2383C8.77986 17.4055 9.05102 17.4055 9.21826 17.2383L17.4805 8.97604L25.7428 17.2383C25.91 17.4055 26.1812 17.4055 26.3484 17.2383L28.0614 15.5253C28.2287 15.358 28.2287 15.0869 28.0614 14.9196L17.7833 4.64155Z' className={isBreedingBird(population) ? 'house-breeding' : 'house-occasional'} />
        <path fillRule='evenodd' clipRule='evenodd' d='M17.1777 10.6371L10.7539 17.0609C10.6736 17.1412 10.6285 17.2501 10.6285 17.3637V28.9266C10.6285 29.1631 10.8202 29.3548 11.0567 29.3548H23.9043C24.1408 29.3548 24.3326 29.1631 24.3326 28.9266V17.3637C24.3326 17.2501 24.2874 17.1412 24.2071 17.0609L17.7833 10.6371C17.6161 10.4699 17.3449 10.4699 17.1777 10.6371ZM17.4804 20.79C18.8995 20.79 20.0499 19.6396 20.0499 18.2205C20.0499 16.8014 18.8995 15.651 17.4804 15.651C16.0613 15.651 14.9109 16.8014 14.9109 18.2205C14.9109 19.6396 16.0613 20.79 17.4804 20.79Z' className={isBreedingBird(population) ? 'house-breeding' : 'house-occasional'} />
      </svg>
    </div>
  )
}

export default BirdHouse
