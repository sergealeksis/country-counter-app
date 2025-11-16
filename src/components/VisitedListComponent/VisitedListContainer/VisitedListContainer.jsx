import React from 'react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { removeCountryFromVisitedWithSync } from '../reducer'
import { COUNTRY_NAMES } from '../../../constans/countries/countries'


export const VisitedListContainer = ({ country, makeVisibleStyle }) => {

  const dispatch = useDispatch();

  if (!country) {
    return null
  }
  return (
    <div className={styles.root}>
      <div className={styles.visitedContainer}>
        <div className={styles.flag}>{country.flag}</div>
        <div className={styles.name}>{country.name}</div>
        <div className={styles[makeVisibleStyle]}
              onClick={() => {
                dispatch(removeCountryFromVisitedWithSync(COUNTRY_NAMES.indexOf(country.name)));
        }}>
          {'\u232b'}
        </div>
      </div>
    </div>
  )
}
