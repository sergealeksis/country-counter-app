import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase.config'
import { sendEmailVerification } from 'firebase/auth'
import styles from './styles.module.css'

export const AuthStateComponent = () => {
    
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    
    const providerName = user.providerData.map(e => e.providerId).toString();

    useEffect(() => {
        const handleOutsideClick = () => {
            setSubmitError(null);
            setMessage(null);
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick)
    },[submitError, message])

    const handleResendVerification = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
                setMessage('A new link to verify your email has been sent');
            } catch (error) {
            setSubmitError(error)
                switch (error.code) {
                default:
                    setSubmitError('An unexpected error occurred');
                }
            }
        };

    if (providerName === 'password') {
        if (!user.emailVerified) {
            return (
                <div> 
                    <div className={styles.mail_text}>Email:</div>
                    <div className={styles.mail_style}>{user.email}</div> 
                    <div className={styles.not_verified_text}>Not verified</div>
                    <div className={styles.not_verified_text}>Verify your email. Not verified accounts will be deleted</div>
                    <button className={styles.verify_again_button} onClick={handleResendVerification}>Send verification link</button>
                    <div className={styles.verify_msg}>{message}</div>
                </div>
                )
            } return (
                <div>
                    <div className={styles.mail_text}>Email:</div>
                    <div className={styles.mail_style}>{user.email}</div> 
                    <div className={styles.verified_text}>Verified</div>
                   
                </div>
            )
        };

        if (providerName === 'github.com') {
            return (
            <div>
                <div className={styles.mail_style}>github.com</div>
            </div>)
        };

        if (user.isAnonymous) {
            return (
            <div>
                <div className={styles.mail_style}>Anonymous</div>
                <div className={styles.mail_text}>Session will not storage</div>
            </div>
            )
        }
}
