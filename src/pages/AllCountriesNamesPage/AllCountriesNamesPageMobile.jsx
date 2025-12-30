import styles from './styles.module.css'
import { COUNTRY_INFO } from '../../constans/countries/countries'
import { useDataLoader } from '../../components/hooks/useDataLoader'
import { useSelector } from 'react-redux'
import { CountryNamesMobileContainer } from '../../components/CountryNamesContainer/CountryNamesMobileContainer'

export const AllCountriesNamesPageMobile = () => {

  useSelector((state) => state.visitedList);
  useSelector((state) => state.wishList);
    
  useDataLoader();
  
  const mainSlice = COUNTRY_INFO.map(e =>
    <div className={styles.all_names_mobile}>
      <CountryNamesMobileContainer children={e} />
    </div>
    
  )
 
  return (
   <div className={styles.root_mobile}>
    {mainSlice}
   </div>
  )
}