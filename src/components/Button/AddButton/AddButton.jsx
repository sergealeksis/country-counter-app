import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCountryToVisitedWithSync } from '../../VisitedListComponent/reducer';
import { COUNTRY_NAMES } from '../../../constans/countries/countries';
import styles from './styles.module.css'

export const AddButton = ({ onclick, children }) => {

  const dispatch = useDispatch();
  const [className, setClassName] = useState(children.visited ? styles.visited : styles.notvisited);


  function add () {
    dispatch(addCountryToVisitedWithSync(COUNTRY_NAMES.indexOf(children.name)));
    setClassName(className === styles.notvisited ? styles.visited : styles.notvisited); 
  }

  function plusOrCheck () {
    return children.visited ? '✓' : '+'
  }

  
return (
  <div className={styles.root}>    
      <div
          className={className}
          onClick={add()}>
          {plusOrCheck()}
      </div>
  </div>
)
}