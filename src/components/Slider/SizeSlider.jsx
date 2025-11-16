import React from 'react'
import styles from './styles.module.css'

export const SizeSlider = ({ value, setValue }) => {
  
  return (
    <div className={styles.root}>
      <input
        className={styles.slider}
        type='range'
        min={10}
        max={500}
        value={value}
        onChange={setValue}>
      </input>
    </div>
  )
}

