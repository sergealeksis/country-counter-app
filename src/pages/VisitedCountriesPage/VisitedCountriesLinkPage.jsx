import styles from './style.module.css'
import { VisitedListComponent } from '../../components/VisitedListComponent/VisitedListComponent'
import { db } from '../../firebase.config'
import { useEffect, useState } from 'react'
import { getUserIdByPublicId } from '../../constans/functions/shareLinkServices'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

export const VisitedCountriesLinkPage = () => {

  const { publicId } = useParams();
  const [visitedCountries, setVisitedCountries] = useState([]);
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
          setError('Travel list not found')
          return
        }

        const visitedSnap = await getDoc(doc(db, 'visitedlists', userId));

        if (visitedSnap.exists()) {
          const visitedCountriesData = visitedSnap.data().visitedlist || [];
          const loadUserName = visitedSnap.data().userName || 'Traveler';
          setVisitedCountries(visitedCountriesData);
          setUserName(loadUserName);
        } else {
          setVisitedCountries([]);
          setUserName('Traveler')
        }
      } catch (err) {
        console.error('Error loading public data:', err);
        setError('Failed to load travel list')
      } finally {
        setIsLoading(false)
      }
    }

    loadPublicData()
  },[publicId])
  
    if (isLoading) {
      return (
        <div>
          <h1 className={styles.h1}>Loading list of visited countries...</h1>
        </div>
      );
    }

  const greetings = () => {
    
    if (isLoading) {
      return (
        <div>
          <h1 className={styles.h1}>Loading list of visited countries...</h1>
        </div>
      );
    }

      if (error) {
        return (
          <div className={styles.root}>
            <h1 className={styles.h1}>Unable to load travel list 😕</h1>
            <h2 className={styles.h2}>{error}</h2>
          </div>
        )
  }
    
    if (visitedCountries.length === 1) {
      return (
        <div>
          <h1 className={styles.h1}>
              {userName} has been to{' '}
            <br className={styles.mobileBreak} />
              {visitedCountries.length} country 🎉
          </h1>
          <h2 className={styles.h2}>
              {`What's next on ${userName}'s journey?`} 🗺️</h2>
        </div>
      )
    } else {
      return (
      <div>
          <h1 className={styles.h1}>
              {userName} has been to{' '}
            <br className={styles.mobileBreak} />
              {visitedCountries.length} countries 🎉
          </h1>
          <h2 className={styles.h2}>
              {`What's next on ${userName}'s journey?`} 🗺️</h2>
        </div>
      )
    }
  }

  return (
     <div className={styles.root}>
         <div className={styles.greetings_shared}> 
          {greetings()}
         </div>
          <VisitedListComponent visitedCountries={visitedCountries} isShared={true}/>    
        </div>
  )
}