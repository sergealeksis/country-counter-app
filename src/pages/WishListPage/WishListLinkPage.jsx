import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WishListComponent } from '../../components/WishListComponent/WishListComponent'
import styles from './styles.module.css'
import { getListTypeByPublicId, getUserIdByPublicId } from '../../constans/functions/shareLinkServices';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

export const WishListLinkPage = () => {

    const { publicId } = useParams();
    const [wishlistCountries, setWishlistCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('Traveler');
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadPublicData = async () => {
        try {
          setIsLoading(true);
          if (!publicId) {
            setError('Invalid share link')
            return
          }
  
          const userId = await getUserIdByPublicId(publicId);
  
          if (!userId) {
            setError('Wishlist not found')
            return
          }

          const listType = await getListTypeByPublicId(publicId);
          if (listType !== 'wishlist') {
            setError('This link is for a visited list, not a wishlist');
            return;
          }
  
          const wishSnap = await getDoc(doc(db, 'wishlists', userId));
  
          if (wishSnap.exists()) {
            const wishCountriesData = wishSnap.data().wishlist || [];
            const loadUserName = wishSnap.data().userName || 'Traveler';
            setWishlistCountries(wishCountriesData);
            setUserName(loadUserName);
          } else {
            setWishlistCountries([]);
            setUserName('Traveler')
          }
        } catch (err) {
          console.error('Error loading public data:', err);
          setError('Failed to load wishlist')
        } finally {
          setIsLoading(false)
        }
      }
  
      loadPublicData()
    },[publicId])
    
    if (isLoading) {
      return (
        <div>
          <h1 className={styles.h1}>Loading your wishlist...</h1>
        </div>
      );
    }

  const greetings = () => {
    
    if (isLoading) {
      return (
        <div>
          <h1 className={styles.h1}>Loading your wishlist...</h1>
        </div>
      );
    }

    if (error) {
        return (
          <div className={styles.root}>
            <h1 className={styles.h1}>Unable to load wishlist 😕</h1>
            <h2 className={styles.h2}>{error}</h2>
          </div>
        )
  }

    if (wishlistCountries.length === 1) {
      return (
        <div>
          <h1 className={styles.h1}>
            {userName} has {wishlistCountries.length} country 
            <br className={styles.mobileBreak} />
            to explore! ✈️</h1>
          <h2 className={styles.h2}>
              {`${userName}'s wishlist is calling!`}</h2>
        </div>
      )
    } else {
      return (
      <div>
          <h1 className={styles.h1}>
            {userName} has {wishlistCountries.length} country 
            <br className={styles.mobileBreak} />
            to explore! ✈️</h1>
          <h2 className={styles.h2}>
             {`${userName}'s wishlist is calling!`}</h2>
        </div>
      )
    }
  }

  return (
    <div className={styles.root}>
    <div className={styles.greetings_shared}>{greetings()}</div>
      <WishListComponent wishlistCountries={wishlistCountries} isShared={true}/>
    </div>
  )
}
