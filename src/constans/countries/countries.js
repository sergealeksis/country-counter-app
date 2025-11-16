import Flag from 'react-world-flags'
import country from 'country-list-js';


export const COUNTRY_NAMES = country.ls('name');
export const COUNTRY_CODES = COUNTRY_NAMES.sort().map(e => country.findByName(e).code.iso2);
export const COUNTRY_CODES_ISO3 = COUNTRY_NAMES.sort().map(e => country.findByName(e).code.iso3);
export const COUNTRY_FLAGS = COUNTRY_CODES.map(e => 
    <Flag code={e} title={'title'}></Flag>);

export const COUNTRY_INFO = Object.values(COUNTRY_NAMES.reduce((acc, key, index) => {
    return {
        ...acc, 
        [key]: {
            name: COUNTRY_NAMES[index],
            iso2: COUNTRY_CODES[index],
            iso3: COUNTRY_CODES_ISO3[index],
            flag: <Flag 
                code={COUNTRY_CODES[index]} 
                title={COUNTRY_NAMES[index]}></Flag>,
            other: '',
            wish: false,
            visited: false,
            index: index
        }
    }},{})); // make new obj from arrays

// updates to country names or specific names
COUNTRY_INFO[215].name = 'Eswatini';
COUNTRY_INFO[215].other = 'Swaziland';
COUNTRY_INFO[235].other = 'UAE';
COUNTRY_INFO[228].other = 'Türkiye';
COUNTRY_INFO[206].other = 'RSA';
COUNTRY_INFO[236].other = 'England Scotland Wales Northen Ireland The Great Britan UK';
delete COUNTRY_INFO[8]
delete COUNTRY_INFO[238]

// taken from here: https://www.npmjs.com/package/country-list-js
// and flags from here https://github.com/smucode/react-world-flags
