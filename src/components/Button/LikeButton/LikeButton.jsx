import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCountryToWishlistSync } from '../../WishListComponent/reducer';
import { COUNTRY_NAMES } from '../../../constans/countries/countries';
import styles from './styles.module.css'

export const LikeButton = ({ children }) => {

    const dispatch = useDispatch();
    const [className, setClassName] = useState(children.wish ? styles.wish : styles.notwish);

    function liked () {
        dispatch(addCountryToWishlistSync(COUNTRY_NAMES.indexOf(children.name)));
        setClassName(className === styles.notwish ? styles.wish : styles.notwish);      
    }

    function setTitle () {
      return children.wish ? 'in your wish list' : 'add to wish list'
    }

    
  return (
    <div className={styles.root}>  
        <div
            className={className}
            title={setTitle()}
            onClick={liked}>
            {'\u2665'}
        </div>
    </div>
  )
}
