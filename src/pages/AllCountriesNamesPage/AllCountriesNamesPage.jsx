import styles from './styles.module.css'
import { COUNTRY_INFO } from '../../constans/countries/countries'
import { CountryNamesContainer } from '../../components/CountryNamesContainer/CountryNamesContainer'
import { useDataLoader } from '../../components/hooks/useDataLoader'
import { useSelector } from 'react-redux'

export const AllCountriesNamesPage = () => {

  useSelector((state) => state.visitedList);
  useSelector((state) => state.wishList);
    
  useDataLoader();
  
  const mainSlice = COUNTRY_INFO.map(e =>
    <CountryNamesContainer children={e} />
  )
 
  return (
    <div className={styles.all}>
      <div className={styles.root}>
        {mainSlice.slice(0,4)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(4,8)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(8,13)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(13,18)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(18,23)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(23,27)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(27,28)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(28,31)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(31,33)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(33,36)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(36,40)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(40,43)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(43,47)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(47,50)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(50,55)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(55,58)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(58,60)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(60,64)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(64,68)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(68,72)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(72,77)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(77,79)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(79,85)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(85,90)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(90,95)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(95,97)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(97,102)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(102,108)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(108,114)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(114,119)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(119,125)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(125,130)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(130,135)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(135,139)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(139,144)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(144,148)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(148,152)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(152,157)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(157,162)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(162,164)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(164,168)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(168,171)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(171,175)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(175,180)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(180,184)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(184,187)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(187,190)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(190,191)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(191,193)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(193,196)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(196,200)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(200,204)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(204,207)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(207,208)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(208,213)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(213,217)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(217,222)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(222,226)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(226,230)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(230,232)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(232,235)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(235,237)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(237,242)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(242,246)}
      </div>
      <div className={styles.root}>
        {mainSlice.slice(246,250)}
      </div>
    </div>
  )
}