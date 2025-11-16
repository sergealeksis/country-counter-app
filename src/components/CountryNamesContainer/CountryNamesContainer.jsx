import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { addCountryToWishlistSync, removeCountryFromWishlistSync } from '../WishListComponent/reducer';
import { COUNTRY_NAMES } from '../../constans/countries/countries';
import { addCountryToVisitedWithSync } from '../VisitedListComponent/reducer';
import { useDataLoader } from '../hooks/useDataLoader';

export const CountryNamesContainer = ({ children }) => {
    const dispatch = useDispatch();
    const [isAnimating, setIsAnimating] = useState(false);

    useDataLoader();

    // ✅ Вычисляем стили на каждом рендере
    const likeStyle = likeStyleCondition();
    const addStyle = children.visited ? styles.visited : styles.add;
    const mainStyle = children.visited ? styles.actionIfVisited : styles.actionButtons;

    function likeStyleCondition() {
        if (children.wish) {
            return styles.wished;
        } else if (children.visited) { 
            return styles.likeIfVisited;
        } else {
            return styles.like;
        }
    }

    function liked() {
        if (!children.wish) {
            setIsAnimating(true);
            dispatch(addCountryToWishlistSync(COUNTRY_NAMES.indexOf(children.name))); 
            setTimeout(() => {
                setIsAnimating(false);
            }, 600);
        } else {
            dispatch(removeCountryFromWishlistSync(COUNTRY_NAMES.indexOf(children.name)));
        }
    }
    
    function setTitleWish() {
        return children.wish ? 'in your wish list' : 'add to wish list';
    }
    
    function add() {
        dispatch(addCountryToVisitedWithSync(COUNTRY_NAMES.indexOf(children.name)));
        dispatch(removeCountryFromWishlistSync(COUNTRY_NAMES.indexOf(children.name)));
    }
    
    function plusOrCheck() {
        return children.visited ? '✓' : '┼';
    }

    const likeClassName = `${likeStyle} ${isAnimating ? styles.animating : ''}`;

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.country}>
                    <div className={mainStyle} title={'you have been there'}>
                        <div 
                            className={addStyle}
                            title={'add to visited list'} 
                            onClick={add}
                        >
                            {plusOrCheck()}
                        </div>
                        <div 
                            className={likeClassName}
                            title={setTitleWish()}
                            onClick={liked}
                        >
                            {'\u2665'}
                        </div>
                    </div>
                    <div className={styles.flag}>{children.flag}</div>
                    {`${children.name.toUpperCase()}`}
                </div>
            </div>
        </div>
    )
}