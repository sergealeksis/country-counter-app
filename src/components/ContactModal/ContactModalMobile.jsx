import styles from './styles.module.css'
import githubIcon from './images/github-mark.png'
import linkedinIcon from './images/InBug-Black.png'
import twitterIcon from './images/twitter.png'
import { useRef } from 'react'

export const ContactModalMobile = ({ onClose }) => {

  const modalRef = useRef();
  
  return (
    <>
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
    </>
  )
}