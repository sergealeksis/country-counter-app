import React, { useState } from 'react'
import styles from './styles.module.css'
import { CountryContainer } from '../CountryContainer/CountryContainer';
import { SizeSlider } from '../Slider/SizeSlider';

export const SearchBar = ({ countries }) => {
// countries - is array of country codes or country objects. must be adjusted for the place of usage
// or adjust it before add as parameter
const [inputText, setInputText] = useState('');
const [rangeValue, setRangeValue] = useState(100)

let inputHandler = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
};

let inputRange = (e) => {
  e.preventDefault();
  setRangeValue(e.target.value);
};

const result = countries.filter(e => {
    return e.name.toLowerCase().includes(inputText.toLowerCase()) ||
    e.iso2.toLowerCase().includes(inputText.toLowerCase()) ||
    e.iso3.toLowerCase().includes(inputText.toLowerCase()) ||
    e.other.toLowerCase().includes(inputText.toLowerCase())
})


  return (
    <div>
        <input
          className={styles.input_field}
          type='text'
          placeholder='search country'
          onChange={inputHandler}
          value={inputText}>
        </input>
          <div className={styles.size_slider}>
            <SizeSlider value={rangeValue} setValue={inputRange}/>
          </div>
          <div className={styles.root}>
            {result.map(e => {
              return (
                <CountryContainer country={e} sizeValue={rangeValue}></CountryContainer>
              )  
              })}
          </div>
          
    </div>
  )
}
