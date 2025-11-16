import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { useCopy } from '../hooks/useCopy'
import twitterIcon from './images/twitter.png'
import telegramIcon from './images/telegram.png'
import whatsappIcon from './images/whatsapp.png'

export const ShareModal = ({ isOpen, onClose, listName, shareLink }) => {
  
  const modalRef = useRef();
  const [isLinkCopied, copyLink] = useCopy();

  const outsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', outsideClick);
    }
      return () => {
        document.removeEventListener('mousedown', outsideClick);
      }
  
  },[isOpen]);


  useEffect(() => {
    if(isOpen){
      onClose()
    }  
  },[])

  
  //close by esc
  useEffect(() => {
      const closeByEscKey = (event) => {
          if (event.key === 'Escape') {
            onClose()
          }
        };

      document.addEventListener('keydown', closeByEscKey);
      
      return () => {
            document.removeEventListener('keydown', closeByEscKey)
        };
    }, [onClose]);   

  const title = () => listName === 'wishlist' ? 
                      'Share Your Travel Wishlist! 🌠' : 
                      'Share Your Travel Map! 📍';

  const messageText = () => listName === 'wishlist' ? 
                      'Check out my travel wishlist! 💜' : 
                      `Check out the countries I've visited! 🗺️📍`;

  
  const shareTelegram = () => {
  const text = `${messageText()}\n ${shareLink}\n 🌍 by Country Counter`;
  window.open(`https://t.me/share/url?url=${encodeURIComponent(text)}`, '_blank');
};

const shareWhatsApp = () => {
  const text = `${messageText()}\n ${shareLink}\n 🌍 by Country Counter`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
};

const shareTwitter = () => {
    const text = `${messageText()}\n ${shareLink}\n 🌍 by Country Counter`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };



  return (
    <>
    {isOpen && (
    <div className={styles.modal} onClick={onClose}>    
        <div 
            className={styles.modal_wrapper} 
            ref={modalRef}
            onClick={e => e.stopPropagation()}>
            <div className={styles.modal_content}>
              <div className={styles.modal_text}>
                {title()}
              </div>

            <div className={styles.share_container}>
              <div className={styles.link_container}>
                <div className={styles.link_text}>{shareLink}
                <button
                  onClick={() => copyLink(shareLink)}
                  className={`${styles.clipboard_button} ${isLinkCopied ? styles.copied : ''}`}
                  alt="copy">
                  {isLinkCopied ? '✓' : '\u2398'}
                </button>
                </div>
              </div>
            </div>
            <div className={styles.share_container}
                 onClick={shareTwitter}>
              <div className={styles.social_container}>
                <img src={twitterIcon} alt="Twitter" className={styles.modal_icon} />
                <span className={styles.social_text}>X</span>
              </div>
            </div>
          <div className={styles.share_container}
               onClick={shareTelegram}>
            <div className={styles.social_container}>
              <img src={telegramIcon} alt="Telegram" className={styles.modal_icon} />
              <span className={styles.social_text}>Telegram</span>
            </div>
          </div>
          <div className={styles.share_container} 
               onClick={shareWhatsApp}>
            <div className={styles.social_container}>
              <img src={whatsappIcon} alt="WhatsApp" className={styles.modal_icon} />
              <span className={styles.social_text}>WhatsApp</span>
            </div>
          </div>
            
              <button 
                className={styles.modal_close_button}
                onClick={onClose}
                aria-label='Close modal'>
                ╳ 
                </button>
              
            </div>
        </div>
    </div> 
    )}
    </>
  )
}