import React from 'react'
import styles from './styles.module.css'

export const NotFoundPage = () => {

const unrealCountries = [
    `just like the country of Krakozhia from the 2004 movie "The Terminal"`,
    `just like the Kingdom of Wakanda from the Marvel Universe`,
    `just like the country of Zamunda from the 1988 movie "Coming to America"`,
    `just like the Principality of Sealand on any map. But Sealand is a real unrecognized micronation located on an offshore platform in the North Sea.`
];

const randomizeText = () => {
    const randomIndex = Math.floor(Math.random() * unrealCountries.length)
    return unrealCountries[randomIndex]
}
  return (
    <div className={styles.page_container}>
        <div className={styles.error_style}>{'404'}</div>
        <div className={styles.greetings}>
            <div className={styles.main_title}>This page doesn't exist </div>
            <div className={styles.title}>{randomizeText()}</div>
        </div>
        
    </div>
  )
}
