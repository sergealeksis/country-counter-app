import React, { useEffect, useState } from 'react'
import { auth } from '../../../firebase.config'
import { signInAnonymously } from '../../../firebase.config'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from './styles.module.css'

export const AuthAnonymously = () => {

    const [user] = useAuthState(auth);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
          const handleOutsideClick = () => {
              setSubmitError(null)
          }
          document.addEventListener('click', handleOutsideClick);
          return () => document.removeEventListener('click', handleOutsideClick)
        },[submitError])

    const handleAnonymousSignIn = async () => {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          setSubmitError(error)
            switch (error.code) {
              default:
                setSubmitError('An unexpected error occurred');
            }
        }
      };
    
      if (user) {
        return null;
      }

  return (
    <div>
      <button className={styles.anonymuously_button} onClick={handleAnonymousSignIn}>Continue as guest</button>
      <div className={styles.anonymuously_output_text}>{submitError}</div>
    </div>
  )
}
