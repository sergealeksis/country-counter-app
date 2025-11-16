import { NavLink } from 'react-router-dom';
import styles from './styles.module.css'

export const FooterSharedLink = () => {

  const year = new Date();
  return (
        <footer className={styles.footer}>
            <div className={styles.footer_content}>
                <NavLink to='/' className={styles.footer_links}>
                    <p>&copy; {year.getFullYear()} Country Counter App by SA</p>
                </NavLink>
            </div>
        </footer>
  )
};
