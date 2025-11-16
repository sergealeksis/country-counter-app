import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { ModalButtonContainer } from '../../ModalButtonContainer/ModalButtonContainer'


export const CountryModal = ({ isOpen, onClose, children }) => {
  //children is country code

  //close by outside click
  const modalRef = useRef();
  const outsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', outsideClick);
    }
      return () => {
        document.removeEventListener('mousedown', outsideClick);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen]);


  useEffect(() => {
    if(isOpen){
      onClose()
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[children])

  
  //close by esc
  useEffect(() => {
      const closeByEscKey = (event) => {
          if (event.key === 'Escape') {
            onClose()
          }
        };

      document.addEventListener('keydown', closeByEscKey);
      
      return () => {
            document.removeEventListener('keydown', closeByEscKey)
        };
    
    }, [onClose]);   
    

  return (
    <>
    {isOpen && (
    <div className={styles.modal} onClick={onClose}>    
        <div 
            className={styles.modal_wrapper} 
            ref={modalRef}
            onClick={e => e.stopPropagation()}
        >
            <div className={styles.modal_content}>
              <div className={styles.modalFlag}>{children.flag}</div>
              <ModalButtonContainer children={children} />
              <button 
                className={styles.modal_close_button}
                onClick={onClose}
                aria-label='Close modal'>
                ╳ 
                </button>
              
            </div>
        </div>
    </div> 
    )}
    </>
  )
}