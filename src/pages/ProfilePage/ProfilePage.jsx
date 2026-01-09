import { updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthStateComponent } from '../../components/Auth/AuthStateComponent/AuthStateComponent';
import { useDispatch } from 'react-redux';
import { addCountryToWishlistSync, clearWishlistWithSync } from '../../components/WishListComponent/reducer';
import { clearVisitedListWithSync } from '../../components/VisitedListComponent/reducer';
import styles from './styles.module.css'
import { COUNTRY_INFO, COUNTRY_NAMES } from '../../constans/countries/countries';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth); 
  const [newDisplayName, setNewDisplayName] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [clearMessage, setClearMessage] = useState(null);
  const [randomCountry, setRandomCountry] = useState(null);
  const [wishButton, setWishButton] = useState(false);
  const [addToWish, setAddToWish] = useState(false);
  
  const validateUsername = () => {
    if (!newDisplayName.trim()) 
      return 'Username cannot be empty';
    if (newDisplayName.length > 25) 
    return 'Max 25 symbols';
    return null;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const badUsermame = validateUsername(newDisplayName) 
      setNameError(badUsermame);
      if (badUsermame) {
        return
      }
      setIsUpdating(true)
      try {
          await updateProfile(auth.currentUser, {
            displayName: newDisplayName
          });
          await auth.currentUser.reload();
          window.location.reload();
          setNewDisplayName('');

      } catch (error) {
        console.error(error)
        alert(error.message)
      } finally {
        setIsUpdating(false)
      }

    }
  
    function clearAll () {
      dispatch(clearVisitedListWithSync());
      dispatch(clearWishlistWithSync());
      setClearMessage('All lists are empty');
    }
    
    function addRandomToWish () {
      setAddToWish(true);
      dispatch(addCountryToWishlistSync(COUNTRY_NAMES.indexOf(randomCountry.name)));
      setTimeout(() => {
        setAddToWish(false);
      }, 7000);
    }

    function randomCountryAction() {
      if (addToWish) {
        return (
          <button 
            className={`${styles.add_to_wishlist_button} ${styles.in_wishlist_button}`}
            disabled>
            {`Added to wishlist! ${'\u2665'}`}
          </button>
        );
      }

      if (randomCountry.wish) {
        return (
          <div className={styles.name_change_output}>
            {randomCountry.name} already in your wishlist
          </div>
        );
      }

      if (randomCountry.visited) {
        return (
          <div className={styles.name_change_output}>
            You've already been to {randomCountry.name}
          </div>
        );
      }

      return (
        <button 
          className={styles.add_to_wishlist_button}
          onClick={addRandomToWish}>
          {`Add to your wish list ${'\u2665'}`}
        </button>
      );
  }

    const getRandomIndex = () => Math.floor(Math.random() * COUNTRY_INFO.length);
   
    const getRandomCountry = () => {
      const randomIndex = getRandomIndex();
      return COUNTRY_INFO[randomIndex];
    };

    const handleRandomCountry = () => {

      const initialCountry = getRandomCountry();
      setRandomCountry(initialCountry);
      setWishButton(false);
      setAddToWish(false);
    
      const spinDuration = 2000;
      const spinInterval = 100;
      const startTime = Date.now();
    
      const spinIntervalId = setInterval(() => {

        const randomCountry = getRandomCountry();
        setRandomCountry(randomCountry);

        if (Date.now() - startTime > spinDuration) {
          clearInterval(spinIntervalId);
          const finalCountry = getRandomCountry();
          setRandomCountry(finalCountry);
          setTimeout(() => 
            setWishButton(true), 500)
        }
      }, spinInterval);
    }
  
    return (
      <div className={styles.page_container}>
        <div className={styles.info_container}>
          <h1 className={styles.page_title}>Profile page</h1>
          <div className={styles.separationLine}></div>
            <div className={styles.profile_menu_option}>User name</div>
              <div className={styles.input_name_change}>
                <form onSubmit={handleSubmit}>
                    <input
                    className={styles.input_field}
                    type="text"
                    value={newDisplayName}
                    onChange={(e) => {setNewDisplayName(e.target.value);
                    if (nameError) setNameError(null);}}
                    placeholder={user?.displayName}
                    disabled={isUpdating}
                  />
                  <button className={styles.input_button} type="submit">Change user name</button>
                </form>
              </div>
            {nameError && <div className={styles.name_change_output}>{nameError}</div>}
          <div className={styles.separationLine}></div>
            <div className={styles.profile_menu_option}>Authorization method</div>
              <div className={styles.auth_method}><AuthStateComponent /></div>
          <div className={styles.separationLine}></div>  
            <div className={styles.profile_menu_option}>Clear all lists</div>
            <button className={styles.clear_lists_button} onClick={() => clearAll()}>Clear</button>
            {clearMessage && <div className={styles.name_change_output}>{clearMessage}</div>}
          <div className={styles.separationLine}></div>
            <div className={styles.profile_menu_option}>Random country</div>
            <button className={styles.clear_lists_button} onClick={handleRandomCountry}>Get a random country</button>
            {randomCountry && (
              <div className={styles.random_container}>
                <div className={styles.name_change_output_random}>
                  {randomCountry.name}
                </div>
                <div className={styles.random_flag}>
                  {randomCountry.flag}
                </div>
              </div>
            )}
            {wishButton && 
              <div>
                {randomCountryAction()}
              </div>}
          </div>
        <div className={styles.img_container}></div>
      </div>
    )
}
