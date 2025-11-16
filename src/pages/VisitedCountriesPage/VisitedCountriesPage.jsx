import { useEffect, useState } from 'react'
import styles from './style.module.css'
import { VisitedListComponent } from '../../components/VisitedListComponent/VisitedListComponent'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase.config'
import { NavLink } from 'react-router-dom'
import { useNotifications } from '../../components/hooks/useNotifications'
import { useDataLoader } from '../../components/hooks/useDataLoader'
import { getVisitedPublicId } from '../../constans/functions/shareLinkServices'
import { ShareModal } from '../../components/ShareModal/ShareModal'

export const VisitedCountriesPage = () => {

  const visitedCountries = useSelector((state) => state.visitedList.visited);
  const isLoading = useSelector((state) => state.visitedList.isLoading);
  const { visitedNotification, handleVisitedClick } = useNotifications();
  const [isCopying, setIsCopying] = useState(false);
  const [modalShareOpen, setModalShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState();

  const generateShareLink = async () => {
    try {
      setIsCopying(true);
      if (!auth.currentUser) {
        alert('Please sign in to share your list');
        return;
      }

      const publicId = await getVisitedPublicId(auth.currentUser.uid)

      if (publicId) {
        const baseUrl = window.location.origin;
        const shareLink = `${baseUrl}/shared/visitedlist/${publicId}`;
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

  useEffect(() => {
    if (visitedNotification) {
      handleVisitedClick();
    }
  }, [visitedNotification, handleVisitedClick]);
  
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
          <h1 className={styles.h1}>Loading list of your visited countries...</h1>
        </div>
      );
    }

  const greetings = () => {
    
    if (isLoading) {
      return (
        <div>
          <h1 className={styles.h1}>Loading list of your visited countries...</h1>
        </div>
      );
    }
    if (visitedCountries.length === 0) {
      return (
        <div>
          <h1 className={styles.h1}>{ 
            'Your journey starts here! 🌍'}
          </h1>
            <h2 className={styles.h2}>
             Start planning your first trip and mark your first visited country 📍
            </h2>
             <div className={styles.links_container}>
                <NavLink className={`${styles.link_to_countries} ${styles.link_to_names}`} to='/allnames'>Countries <br /> by names</NavLink>
                <NavLink className={`${styles.link_to_countries} ${styles.link_to_flags}`} to='/allflags'>Countries <br /> by flags</NavLink>
              </div>
        </div>
      )
    } else if (visitedCountries.length === 1) {
      return (
        <div>
          <h1 className={styles.h1}>{ 
            `${userName()}, you've been to ${visitedCountries.length} country 🎉`}</h1>
          <h2 className={styles.h2}>
              What's next on your journey? 🗺️</h2>
          <button 
            className={styles.share_button}
            onClick={generateShareLink}
            disabled={isCopying}>
            Share your achievement
          </button>
        </div>
      )
    } else {
      return (
      <div>
          <h1 className={styles.h1}>{ 
            `${userName()}, you've been to ${visitedCountries.length} countries 🎉`}</h1>
          <h2 className={styles.h2}>
              What's next on your journey? 🗺️</h2>
          <button 
            className={styles.share_button}
            onClick={generateShareLink}
            disabled={isCopying}>
            Share your achievement
          </button>
        </div>
      )
    }
  }

  return (
     <div className={styles.root}>
         <div className={styles.greetings}> 
          {greetings()}
         </div>
          <VisitedListComponent isShared={false}/>    
          
          <ShareModal
          isOpen={modalShareOpen} //modalShareOpen
          onClose={() => {setModalShareOpen(false)}}
          listName={'visited'}
          shareLink={shareLink}>
          </ShareModal>
          
        </div>
  )
}