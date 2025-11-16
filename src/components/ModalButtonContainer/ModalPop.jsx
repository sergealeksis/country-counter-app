import React from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.css'

export const WishlistPop = ({ isOpen, onClose }) => {

    // if (isOpen) {
    //     setTimeout(onClose, 4000)
    // }

  return (
    <>
    {isOpen && (
      <div className={styles.popMain}>
        <div className={styles.popText}>added to</div>
        <div className={styles.popLink}><Link to='/wishlist'>wish list</Link></div>
      </div>
    )}
    </>
  )
}
