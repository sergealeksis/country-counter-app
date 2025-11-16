import { NavLink } from 'react-router-dom'
import sharedLogo from './images/logo2.svg'
import styles from './styles.module.css';

export const HeaderSharedLink = () => {
    return (
    <>
        <header className={styles.header_sharedlink}>
            <NavLink to='/'>
                <img 
                    src={sharedLogo} 
                    alt='Country Counter'
                    className={styles.shared_logo}>
                </img>
            </NavLink>
        </header>
    </>
  )
}
