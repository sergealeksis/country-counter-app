import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from './styles.module.css'
import { addCountryToWishlistSync, removeCountryFromWishlistSync } from '../WishListComponent/reducer';
import { addCountryToVisitedWithSync } from '../VisitedListComponent/reducer';
import { COUNTRY_NAMES } from '../../constans/countries/countries';
import { Link } from 'react-router-dom';


export const ModalButtonContainer = ({ children }) => {

    const dispatch = useDispatch();
    const [isAnimating, setIsAnimating] = useState(false);

    // set classname when visited
    const [nameOrLink, setNameOrLink] = useState(
        children.visited ?
        <div>You have {<Link to='/visited'> visited </Link>}</div> :
        children.name)

    // MAKE LOADER!!! set info styles when loading or visited/liked 
    const infoClassName = () => {
        if (children.visited) {
           return styles.rootInfoVisited
        } else if (children.wish) {
            return styles.rootInfoWished
        } else {
            return styles.rootInfoLoader
        }
    };

    //calculate initial value for info div message
    const infoText = () => {
        if (children.visited) {
           return children.name
        } else if (children.wish) {
            return <div className={styles.wish_container}>
                <span className={styles.wish_title}>in your</span>
                <span className={styles.wish_link}>
                    <Link to='/wishlist'> wish list </Link>
                </span>
            </div>
        } else {
            return null
        }
    };

    //set global style when country visited
    const infoRootStyle = () => {
        if (children.visited) {
           return styles.rootVisited
        } else if (children.wish) {
            return styles.root
        } else {
            return styles.root
        }
    };

    const [wishClassNames, setWishClassNames] = useState(
        children.wish ? styles.wish : styles.notwish);
    const [infoMessage, setInfoMessage] = useState(() => infoText());
    const [rootStyle, setRootStyle] = useState(() => infoRootStyle())
    const [infoClassNames, setInfoClassNames] = useState(() => infoClassName())

    function addToWish () {
        if (!children.wish) {
            setIsAnimating(true);
            dispatch(addCountryToWishlistSync(COUNTRY_NAMES.indexOf(children.name)));
            setWishClassNames(styles.wish);
            setInfoMessage(infoText());
            setInfoClassNames(styles.rootInfoWished);
            setTimeout(() => {
                setIsAnimating(false);
            }, 600);
        } else {
            dispatch(removeCountryFromWishlistSync(COUNTRY_NAMES.indexOf(children.name)));
            setWishClassNames(styles.notwish);
            setInfoMessage(null);
            setInfoClassNames(styles.rootInfoLoader);
        }
        
    }

    function addToVisited () {
        dispatch(addCountryToVisitedWithSync(COUNTRY_NAMES.indexOf(children.name)))
        dispatch(removeCountryFromWishlistSync(COUNTRY_NAMES.indexOf(children.name))); 
        setNameOrLink(
            children.visited ?
            <div>You have {<Link to='/visited'> visited </Link>}</div> :
            children.name);
        setInfoMessage(infoText());
        setInfoClassNames(styles.rootInfoVisited);
        setRootStyle(infoRootStyle());
        setWishClassNames(styles.notwish);
        setIsAnimating(false);
      }

  return (

    <div className={rootStyle}>
        <div className={styles.modalName}>{nameOrLink}</div>
        <div className={styles.rootWish}>
            <div
                className={`${wishClassNames} ${isAnimating ? styles.animating : ''}`}
                onClick={addToWish}>
                {'\u2665'}
            </div>
        </div>
        
        <div className={infoClassNames}>
        {infoMessage}
        </div>
        
        <div className={styles.rootAdd}>
            <div className={styles.wrapper}>
                <div
                className={styles.notvisited}
                onClick={addToVisited}>
                ┼
                </div>
            </div>
        </div>
    </div>
  )
}
