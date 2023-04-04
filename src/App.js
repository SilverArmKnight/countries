import axios from 'axios'
import { useState, useEffect } from 'react'

import CountryName from './components/CountryName'
import CountryInfo from './components/CountryInfo'

const App = () => {
  // Extract data from the website.
  const [countries, setCountries] = useState([])

  // We need a event handler that takes countries, and return countries' names.
  const [countryNames, setCountryNames] = useState([])

  // Search bar filter.
  const [searchBar, setSearchBar] = useState('')

  // Country info.
  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log("promise fulfilled")
        setCountries(response.data)
        handleCountryNames(response.data)
      })
  }, [])

  const handleCountryNames = (countries) => {
    const countryNameLst = countries.map(info => info.name)
    setCountryNames(countryNameLst)
  }

  const handleSearchBar = (event) => {
    console.log(event.target.value)
    setSearchBar(event.target.value)
  }

  const countryNameFilter = searchBar
    ? countryNames.filter(name => new RegExp(searchBar, "i").test(name.common))
    : []

  const countryInfoFilter = searchBar
    ? countries.filter(info => new RegExp(searchBar, "i").test(info.name.common))
    : "Error: Cannot find the info of the country you are looking for."

  const CountryShow = (props) => {
    if (props.nameArray.length > 10) {
      return "Too many matches, specify another filter"

    } else if (props.nameArray.length < 11 && props.nameArray.length > 1) {
      return (props.nameArray)
      
    } else if (props.nameArray.length === 1) {
        return (
          <div>
            <CountryInfo props={countryInfoFilter}/>
          </div>
        )
    }
  }

  return (
    <div>
      <div>
        find countries <input
        value={searchBar}
        onChange={handleSearchBar}/>  
      </div>
      <div>
        <CountryShow nameArray={countryNameFilter.map(countryName => 
        <CountryName key={countryNames.indexOf(countryName)} 
        countryName={countryName}
        setSearchBar={setSearchBar}/>
        )}/>
      </div>
    </div>
  )
}

export default App