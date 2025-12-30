import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { COUNTRY_INFO } from '../../constans/countries/countries'
import { VisitedListContainer } from './VisitedListContainer/VisitedListContainer'
import styles from './styles.module.css'

export const VisitedListComponent = ({ visitedCountries, isShared = false }) => {

    const visitedListState = useSelector((state) => state.visitedList.visited);
    const visitedListAllowed = visitedCountries || visitedListState;
    const [showDelete, setShowDelete] = useState('hideDeleteButton');
    const [buttonText, setButtonText] = useState('Edit')

    const editButtonFunction = () => {
        setShowDelete(showDelete === 'hideDeleteButton' ? 'showDeleteButton' : 'hideDeleteButton');
        setButtonText(showDelete === 'hideDeleteButton' ? 'Done' : 'Edit')
    }

  return (
    <div className={styles.root}>
    {(visitedListState.length && !isShared &&
        (<button
                className={styles.edit_button}
                onClick={() => editButtonFunction()}>
                {buttonText}
        </button>
        )) || null }
      <div className={styles.content_wrapper}>
        {visitedListAllowed.map(e => 
            <VisitedListContainer 
                country={COUNTRY_INFO[e]} 
                makeVisibleStyle={showDelete}
            />)}
      </div>
     </div>
  )
}
