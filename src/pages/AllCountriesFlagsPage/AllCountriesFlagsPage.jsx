import styles from './styles.module.css'
import { COUNTRY_INFO } from '../../constans/countries/countries'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useDataLoader } from '../../components/hooks/useDataLoader'


export const AllCountriesFlagsPage = () => {

    useDataLoader();

    return (
      <div className={styles.root}>
        <div className={styles.search_bar}>
          <SearchBar
            countries={COUNTRY_INFO}
          ></SearchBar>
        </div>
      </div>
    )
}