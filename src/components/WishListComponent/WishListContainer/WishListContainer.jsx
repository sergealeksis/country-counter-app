import React from 'react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import { COUNTRY_NAMES } from '../../../constans/countries/countries';
import { removeCountryFromWishlistSync } from '../reducer';
import { addCountryToVisitedWithSync } from '../../VisitedListComponent/reducer';

export const WishListContainer = ({ country, isShared = false }) => {
    
    const dispatch = useDispatch();
    
    function addToVisited () {
        dispatch(addCountryToVisitedWithSync(COUNTRY_NAMES.indexOf(country.name)));
        dispatch(removeCountryFromWishlistSync(COUNTRY_NAMES.indexOf(country.name))); 
      }

    if (!country) {
        return null;
      }
    
  return (
    <div className={styles.root}>
        <div className={styles.wishContainer}>
            {!isShared && (
              <div className={styles.like}
                 onClick={() => 
                        dispatch(removeCountryFromWishlistSync(COUNTRY_NAMES.indexOf(country.name)))}>
                        {'\u2665'}
              </div>
            )}
            <div className={styles.flag}>{country.flag}</div>
            <div className={styles.name}>{country.name}</div>
            {!isShared && (
              <div className={styles.visited}
                 onClick={() => addToVisited()}>
                 ┼
              </div>
            )}
        </div>
    </div>
    
  )
}