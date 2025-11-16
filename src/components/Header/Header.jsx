import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import mainLogo from './images/logo1.svg'
import { useNotifications } from '../hooks/useNotifications';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.config';
import styles from './styles.module.css';

export const Header = () => {
  
    const getLinkClass = ({ isActive }) => 
        isActive ? `${styles.menu_link} ${styles.menu_link_active}` : styles.menu_link;
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const { wishlistNotification,
      visitedlistNotification,
      handleWishClick,
      handleVisitedClick
    } = useNotifications();

    const handleSignOut = async () => {
        try {
          await signOut(auth);
          navigate('/');
        } catch (error) {
          console.error('Sign out error:', error);
          alert('Error signing out. Please try again.');
        }
      };
  
    return (<>
                <header className={styles.header}>
                <NavLink to='/allflags'>
                <img 
                    src={mainLogo} 
                    alt='Country Counter'
                    className={styles.main_logo}>
                </img>
                </NavLink>
                <div className={styles.links_container}>
                    <NavLink className={getLinkClass} to='/allflags'>Countries by flags</NavLink>
                    <NavLink className={getLinkClass} to='/allnames'>Countries by names</NavLink>
                    <div className={styles.without_notification}>
                    <NavLink className={getLinkClass} 
                            to='/wishlist'
                            onClick={handleWishClick}>
                            Wish list
                    </NavLink>
                    {wishlistNotification && <div className={styles.with_notification}></div>}
                    </div>
                    <div className={styles.without_notification}>
                    <NavLink className={getLinkClass} 
                            to='/visited'
                            onClick={handleVisitedClick}>
                            Visited countries
                    </NavLink>
                    {visitedlistNotification && <div className={styles.with_notification}></div>}
                    </div>
                </div>
                <div className={styles.profile_container}>
                    <ProfileImage />
                    <NavLink className={getLinkClass} to='/profile'>Hi, {user?.displayName || 'Guest'}</NavLink>
                    <div className={styles.menu_link} onClick={handleSignOut}>Sign out</div>
                </div>
                </header>
            </>
  )
}
