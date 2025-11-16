import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleTheme } from './reducer';
import styles from './styles.module.css'

export const ToggleThemeButton = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.profile} onClick={() => dispatch(toggleTheme())}>{'theme'}</div>
  )
}
