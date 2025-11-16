import React from 'react'
import { AuthGitHub } from '../../components/Auth/AuthGitHub/AuthGitHub';
import { AuthEmail } from '../../components/Auth/AuthEmail/AuthEmail';

import styles from './styles.module.css'
import { AuthAnonymously } from '../../components/Auth/AuthAnonymously/AuthAnonymously';
import { Link } from 'react-router-dom';


export const SignInPage = () => {

    return (
        <div className={styles.page_layout}>
            <div className={styles.img_container}></div>
            <div className={styles.signin_container}>
                <div><Link className={styles.back_home_button} to='/'>╳</Link></div>
                <div className={styles.signin_img}>
            </div>
                <div className={styles.auth_container}>
                    <AuthEmail />
                    <div className={styles.alt_method_container}>
                        <AuthGitHub />
                        <div className={styles.separation_line}>or</div>
                        <AuthAnonymously />
                    </div>
                </div>
            </div>
            
       </div>
    )

}
