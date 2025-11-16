import { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import githubIcon from './images/github-mark.png'
import linkedinIcon from './images/InBug-Black.png'
import twitterIcon from './images/twitter.png'

export const ContactModal = ({ isOpen, onClose }) => {
  
  const modalRef = useRef();
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
    

  return (
    <>
    {isOpen && (
    <div className={styles.modal} onClick={onClose}>    
        <div 
            className={styles.modal_wrapper} 
            ref={modalRef}
            onClick={e => e.stopPropagation()}
        >
            <div className={styles.modal_content}>
             <div className={styles.modal_title}>Get in Touch</div>
              <div className={styles.modal_text}>We'd love to hear from you! <br />
              Reach out through any of the channels below:
              </div>
              <div className={styles.modal_links}>
                <a 
                  href="https://github.com/sergealeksis"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" className={styles.modal_icon} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sergealekseev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinIcon} alt="LinkedIn" className={styles.modal_icon} />
                </a>
                <a 
                  href="https://www.x.com/sergealexeev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitterIcon} alt="X" className={styles.modal_icon} />
                </a>
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