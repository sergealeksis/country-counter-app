import React from 'react'
import { auth } from '../../firebase.config'
import styles from './styles.module.css'

export const ProfileImage = () => {

const user = auth.currentUser;
const providerName = user.providerData.map(e => e.providerId).toString();
const displayName = user.displayName || '\u2708'
const letterUserpic = displayName.charAt(0).toUpperCase();


if (!user) {
    return (
      <div className={styles.userpic}>
        <span className={styles.letter}>?</span>
      </div>
    );
  }



if (user.photoURL && providerName === 'github.com') {
    return <img alt={user.displayName} 
            width='40px' 
            src={user.photoURL}
            className={styles.image}>
            </img>
}

if (user.photoURL) {
    return <img alt={displayName} width='40px' src={user.photoURL} className={styles.image} />
  }

return (
    <div className={styles.userpic}>
      <span className={styles.letter}>{letterUserpic}</span>
    </div>
  );
}
