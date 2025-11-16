import React from 'react'
import styles from './styles.module.css'

export const Button = ({ children, onClick, disabled }) => {
  return <button 
  className={styles.root} 
  onClick={onClick}
  disabled={disabled}>
  {children}
  </button>
}

