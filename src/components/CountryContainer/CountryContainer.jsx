import React, { useState } from 'react'
import styles from './styles.module.css'
import { CountryModal } from '../CountryModal/ModalWindow/CountryModal';


export const CountryContainer = ({ country, sizeValue = 100 }) => {
  // country is an element of the array of countries
  // country expects as COUNTRY_INFO[XX]
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const height = {
    height: `${sizeValue}px`
  } 
    
  if (!country) {
    return null;
  }

  return (
    <div className={styles.root}
        style={height}
        onClick={
          () => setModalIsOpen(true)}>
        {country.flag}
        
        <CountryModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          children={country}
        ></CountryModal>
    </div>    
)}



