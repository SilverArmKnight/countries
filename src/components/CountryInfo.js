import axios from 'axios'
import { useState, useEffect } from 'react'

import CountryLanguage from './CountryLanguage'

const CountryInfo = ({props}) => {
  const languageDict = props[0].languages
  const languageArr = Object.values(languageDict)

  const countryName = props[0].name.common
  const capital = props[0].capital[0]
  const area = props[0].area
  const flag = props[0].flags.png
  const apiKey = process.env.REACT_APP_API_KEY

  const [temperature, setTemperature] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [wind, setWind] = useState(null)
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setTemperature(response.data.main.temp)
        setWeatherIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
        setWind(response.data.wind.speed)
      })
  })
  
  
  return (
    <div>
      <h2>{countryName}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
  
      <h4>languages:</h4>
      <ul>
        {languageArr.map(language => 
          <CountryLanguage key={language} language={language}/>
        )}
      </ul>
      <img src={flag} alt="fuck you" width="150px"/>

      <h3>Weather in {capital}</h3>
      <div>temperature {temperature} Celsius</div>
      <img src={weatherIcon} alt="2.20 done"/>
      <div>wind {wind} m/s</div>
    </div>
  )
}

export default CountryInfo