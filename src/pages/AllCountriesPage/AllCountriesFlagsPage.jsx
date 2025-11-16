import React from 'react'
import styles from './styles.module.css'
import { COUNTRY_INFO } from '../../constans/countries/countries'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { SizeSlider } from '../../components/Slider/SizeSlider'


export const AllCountriesPage = () => {

return (
  <div className={styles.root}>
    <SizeSlider />
    <SearchBar 
    countries={COUNTRY_INFO}
    ></SearchBar>
  </div>
)
}