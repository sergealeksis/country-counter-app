import React, { useState } from 'react'
import styles from './styles.module.css'
import { ContactModal } from '../ContactModal/ContactModal';
import { CoffeeModal } from '../CoffeeModal/CoffeeModal';

export const Footer = () => {
  
  const [modalContactIsOpen, setModalContactIsOpen] = useState(false);
  const [modalCoffeeIsOpen, setModalCoffeeIsOpen] = useState(false);
  


  const year = new Date();
  return (
        <footer className={styles.footer}>
            <div className={styles.footer_content}>
                <p>&copy; {year.getFullYear()} Country Counter App by SA</p>
                <div className={styles.footer_links_container}>
                    <div 
                        className={styles.footer_links} 
                        onClick={() => setModalContactIsOpen(true)}>
                        Contact
                    </div>
                    <div 
                        className={styles.footer_links}
                        onClick={() => setModalCoffeeIsOpen(true)}>
                        Buy me a coffee
                    </div>

                        <ContactModal
                        isOpen={modalContactIsOpen}
                        onClose={() => setModalContactIsOpen(false)}>
                        </ContactModal>

                        <CoffeeModal
                        isOpen={modalCoffeeIsOpen}
                        onClose={() => setModalCoffeeIsOpen(false)}>
                        </CoffeeModal>
                </div>
            </div>
        </footer>
  )
}
