import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import { COUNTRY_INFO } from '../../constans/countries/countries'
import { WishListContainer } from './WishListContainer/WishListContainer'

export const WishListComponent = ({ wishlistCountries, isShared = false }) => {
    const wishListState = useSelector((state) => state.wishList.wishlist);
    const wishListAllowed = wishlistCountries || wishListState;

    return (
      <div className={styles.root}>
        <div className={styles.content_wrapper}>
          {wishListAllowed.map(e => 
          <WishListContainer
            country={COUNTRY_INFO[e]}
            isShared={isShared}
          />
          )}
        </div>
      </div>
    )
}