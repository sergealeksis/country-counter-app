import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CountryModal } from '../CountryModal/ModalWindow/CountryModal';


export const CountryContainer = ({ country, sizeValue = 100 }) => {
  // country is an element of the array of countries
  // country expects as COUNTRY_INFO[XX]
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('3/2');
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current.querySelector('img') || imgRef.current;
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(`${img.naturalWidth}/${img.naturalHeight}`);
      }
    }
  }, [country.flag]);

  const style = {
    height: `${sizeValue}px`,
    aspectRatio: aspectRatio
  };
    
  if (!country) {
    return null;
  }

  return (
    <div className={styles.root}
        style={style}
        ref={imgRef}
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



