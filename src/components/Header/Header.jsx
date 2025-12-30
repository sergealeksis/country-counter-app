import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import mainLogo from './images/logo1.svg'
import { useNotifications } from '../hooks/useNotifications';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.config';
import styles from './styles.module.css';
import { ContactModal } from '../ContactModal/ContactModal';
import { CoffeeModal } from '../CoffeeModal/CoffeeModal';
import { ContactModalMobile } from '../ContactModal/ContactModalMobile';
import { CoffeeModalMobile } from '../CoffeeModal/CoffeeModalMobile';

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileModalType, setMobileModalType] = useState('main');

  const getLinkClass = ({ isActive }) => 
    isActive ? `${styles.menu_link} ${styles.menu_link_active}` : styles.menu_link;
  
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { 
    wishlistNotification,
    visitedlistNotification,
    handleWishClick,
    handleVisitedClick
  } = useNotifications();

  const modalRef = useRef();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Error signing out. Please try again.');
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMobileModalType('main');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileModalType('main');
  };

  const outsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', outsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeByEscKey = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', closeByEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', closeByEscKey);
    };
  }, [isMenuOpen]);

  const MainModalContent = () => {
    const handleMobileLinkClick = () => {
      closeMenu();
    };

    const handleMobileWishClick = () => {
      handleWishClick();
      closeMenu();
    };

    const handleMobileVisitedClick = () => {
      handleVisitedClick();
      closeMenu();
    };

    const handleMobileSignOut = () => {
      handleSignOut();
      closeMenu();
    };

    const getMobileLinkClass = ({ isActive }) => 
      isActive ? `${styles.mobile_menu_link} ${styles.active}` : styles.mobile_menu_link;

    return (
      <>
        <div className={styles.modal_username}>
          <ProfileImage  /> 
          <span>Hi, {user?.displayName || 'Guest'}</span>
        </div>
        <div className={styles.mobile_links_container}>
          <NavLink 
            className={getMobileLinkClass} 
            to='/profile'
            onClick={handleMobileLinkClick}
          >
            Profile
          </NavLink>
          <NavLink 
            className={getMobileLinkClass} 
            to='/allflags'
            onClick={handleMobileLinkClick}
          >
            Countries by flags
          </NavLink>
          <NavLink 
            className={getMobileLinkClass} 
            to='/allnames'
            onClick={handleMobileLinkClick}
          >
            Countries by names
          </NavLink>
          <div className={styles.mobile_notification_container}>
            <NavLink 
              className={getMobileLinkClass} 
              to='/wishlist'
              onClick={handleMobileWishClick}
            >
              Wish list
            </NavLink>
            {wishlistNotification && <div className={styles.mobile_with_notification}></div>}
          </div>
          <div className={styles.mobile_notification_container}>
            <NavLink 
              className={getMobileLinkClass} 
              to='/visited'
              onClick={handleMobileVisitedClick}
            >
              Visited countries
            </NavLink>
            {visitedlistNotification && <div className={styles.mobile_with_notification}></div>}
          </div>
          <div 
            className={styles.mobile_menu_link}
            onClick={() => setMobileModalType('contact')}
          >
            Contact
          </div>
          {/* <div 
            className={styles.mobile_menu_link}
            onClick={() => setMobileModalType('coffee')}
          >
            Buy me a coffee
          </div> */}
          <div 
            className={styles.mobile_sign_out} 
            onClick={handleMobileSignOut}
          >
            Sign out
          </div>
        </div>
      </>
    );
  };

  const MobileMenuModal = () => {
    if (!isMenuOpen) return null;

    let content;
    switch (mobileModalType) {
      case 'contact':
        content = (
          <>
            <button 
              className={styles.modal_close_button}
              onClick={() => setMobileModalType('main')}
              aria-label='Close modal'>
                ╳ 
            </button>
            <ContactModalMobile onClose={() => setMobileModalType('main')} />
          </>
        );
        break;
      case 'coffee':
        content = (
          <>
            <button 
              className={styles.modal_close_button}
              onClick={() => setMobileModalType('main')}
              aria-label='Close modal'>
                ╳ 
            </button>
            <CoffeeModalMobile onClose={() => setMobileModalType('main')} />
          </>
        );
        break;
      default:
        content = <MainModalContent />;
        break;
    }

    return (
      <div className={styles.modal} onClick={closeMenu}>    
        <div 
          className={styles.modal_wrapper} 
          ref={modalRef}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.modal_content}>
            {content}
          </div>
        </div>
      </div> 
    );  
  };

  const DesktopHeader = () => (
    <header className={styles.header}>
      <NavLink to='/allflags'>
        <img 
          src={mainLogo} 
          alt='Country Counter'
          className={styles.main_logo}
        />
      </NavLink>
      <div className={styles.links_container}>
        <NavLink className={getLinkClass} to='/allflags'>Countries by flags</NavLink>
        <NavLink className={getLinkClass} to='/allnames'>Countries by names</NavLink>
        <div className={styles.without_notification}>
          <NavLink 
            className={getLinkClass} 
            to='/wishlist'
            onClick={handleWishClick}
          >
            Wish list
          </NavLink>
          {wishlistNotification && <div className={styles.with_notification}></div>}
        </div>
        <div className={styles.without_notification}>
          <NavLink 
            className={getLinkClass} 
            to='/visited'
            onClick={handleVisitedClick}
          >
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
  );

  const MobileHeader = () => (
    <header className={styles.header}>
      <NavLink to='/allflags'>
        <img 
          src={mainLogo} 
          alt='Country Counter'
          className={styles.main_logo}
        />
      </NavLink>
      
      <button 
        className={styles.burger_button}
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        <span className={styles.burger_line}></span>
        <span className={styles.burger_line}></span>
        <span className={styles.burger_line}></span>
      </button>
 
      <MobileMenuModal />
    </header>
  );

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};