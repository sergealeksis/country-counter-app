import { WishListComponent } from '../../components/WishListComponent/WishListComponent'
import styles from './styles.module.css'
import { auth } from '../../firebase.config'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDataLoader } from '../../components/hooks/useDataLoader'
import { getWishPublicId } from '../../constans/functions/shareLinkServices'
import { useState } from 'react'
import { ShareModal } from '../../components/ShareModal/ShareModal'


export const WishListPage = () => {

  const wishlistCountries = useSelector((state) => state.wishList.wishlist);
  const isLoading = useSelector((state) => state.wishList.isLoading);
  const [isCopying, setIsCopying] = useState(false);
  const [modalShareOpen, setModalShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState();


  const generateWishlistShareLink = async () => {
      try {
        setIsCopying(true);
        if (!auth.currentUser) {
          alert('Please sign in to share your list');
          return;
        }
  
        const publicId = await getWishPublicId(auth.currentUser.uid)
  
        if (publicId) {
          const baseUrl = window.location.origin;
          const shareLink = `${baseUrl}/shared/wishlist/${publicId}`;
          setShareLink(shareLink);
          try {
            await navigator.clipboard.writeText(shareLink);
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
          setModalShareOpen(true);
        } else {
          alert('Error generating share link');
        }
  
      } catch (err) {
        console.error('Error generating share link:', err);
        alert('Error generating share link');
      } finally {
        setIsCopying(false);
      }
    };
   
  useDataLoader();

  const userName = () => {
    if (auth.currentUser && auth.currentUser.displayName) {
      return auth.currentUser.displayName
    } else {
      return 'Guest'
    }
  }

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

    if (wishlistCountries.length === 0) {
      return (
        <div>
          <h1 className={styles.h1}>
            What's on your travel wishlist? 🌴
          </h1>
            <h2 className={styles.h2}>
             Add countries you dream of visiting and build your perfect bucket list
            </h2>
               <div className={styles.links_container}>
                <NavLink className={`${styles.link_to_countries} ${styles.link_to_flags}`} to='/allflags'>Countries <br /> by flags</NavLink>
                <NavLink className={`${styles.link_to_countries} ${styles.link_to_names}`} to='/allnames'>Countries <br /> by names</NavLink>
              </div>
        </div>
      )
    } else if (wishlistCountries.length === 1) {
      return (
        <div>
          <h1 className={styles.h1}>{ 
            `${wishlistCountries.length} country to explore, ${userName()}! ✈️`}</h1>
          <h2 className={styles.h2}>
              Your wishlist is calling!</h2>
          <button 
            className={styles.share_button}
            onClick={generateWishlistShareLink}
            disabled={isCopying}>
            Share Your Dreams
          </button>
        </div>
      )
    } else {
      return (
      <div>
          <h1 className={styles.h1}>{ 
            `${wishlistCountries.length} countries to explore, ${userName()}! ✈️`}</h1>
          <h2 className={styles.h2}>
              Your wishlist is calling!</h2>
          <button 
            className={styles.share_button}
            onClick={generateWishlistShareLink}
            disabled={isCopying}>
            Share Your Dreams
          </button>
        </div>
      )
    }
  }

  return (
    <div className={styles.root}>
    <div className={styles.greetings}>{greetings()}</div>
      <WishListComponent />

      <ShareModal
        isOpen={modalShareOpen} 
        onClose={() => {setModalShareOpen(false)}}
        listName={'wishlist'}
        shareLink={shareLink}>
      </ShareModal>
    </div>
  )
}
