import React, { useEffect, useState } from 'react';
import { auth, githubProvider } from '../../../firebase.config';
import { signInWithPopup } from 'firebase/auth';
import styles from './styles.module.css'


export const AuthGitHub = () => {

    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
      const handleOutsideClick = () => {
          setSubmitError(null)
      }
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick)
    },[submitError])

    const signInWithGitHub = async () => {
        setSubmitError(null)
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            setSubmitError(error)
            switch (error.code) {
              case 'auth/account-exists-with-different-credential':
                setSubmitError('This email is already used. Log by email.');
                break;
              default:
                setSubmitError('An unexpected error occurred');
            }
            }
        };
  return (
    <div>
      <button className={styles.github_button}onClick={signInWithGitHub}>Sign in by Github</button>
      <div className={styles.github_output_text}>{submitError}</div>
    </div>
  )
}

