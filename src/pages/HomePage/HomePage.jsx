import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const HomePage = () => {

    return (
        <div className={styles.page_container}>
            <div className={styles.greetings}>
                <h1>Create <br />your travel list</h1>
                <p>Share it with your friends,</p>
                <p>create wish lists and track them.</p>
                <p>Keep track of where you've been</p>
                <p>and discover new destinations</p>
                <Link className={styles.start_btn} to='/sign-in'>Get started</Link>
            </div>     
        </div>
    )  
    
}