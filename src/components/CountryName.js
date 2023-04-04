const CountryName = ({countryName, setSearchBar}) => {
  // Hope the difference between onClick and handleClick won't be too much.
  //console.log("countryName:", countryName)
  //console.log("handleSearchBar:", handleSearchBar)
  return (
    <div>
      {countryName.common} <button
        onClick={() => setSearchBar(countryName.common)}>show</button>
    </div>
  )
}

export default CountryName