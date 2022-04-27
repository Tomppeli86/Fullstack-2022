
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  


  const handleSearch = (event)  => { 
    setNewSearch(event.target.value)
    const keyword = (event.target.value)

      if (keyword !== '') {
        const results = countries.filter(
        (country) => {
          return country.name.common.toLowerCase().includes(keyword.toLowerCase());
            });
              
            if (results.length <= 10) {
                setFiltered(results)    
            }
      }
  }


  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      } 
    )
  }
  useEffect(hook, [])

  

  return (

    <div className="allareas">
        <h2>Countries</h2>
          <form>  
            <div>Search for a country:&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; 
              <input 
               value={newSearch} 
               type="text" 
                name="searchfield"
                placeholder="Filter Countries..."
                onChange={handleSearch}/>
            </div>  
          </form> <br></br>
    

        <div className="filteredcountries">
            
            {(() => { 
              if (filtered.length === 1) {
                return ( 
                    <div> <br></br><br></br>           
                      {filtered.map((country, i) => (
                        <li key={i}> 
                          <b>{country.name.common.toString()}</b>
                          <br></br><br></br>
                          &#9679; Capital city: <b> {country.capital.toString()}</b><br>
                          </br>&#9679; Area: {country.area.toString()}
                          
                          <p>Spoken languages:</p>
                          {Object.values(country.languages).map((lang, ind) => 
                          <li key={ind}><b>{lang.toString()}</b><br></br></li>)}

                          <br></br><br></br>
                          <img className="flag" src={country.flags.png}></img>
                          <br></br><br></br>
                        </li>))} 
                      </div> )


              } else if (filtered.length<=10) {
                  return (
                    <div>            
                      {filtered.map((country, i) => (
                        <li key={i}>
                          <b>{country.name.common.toString()}</b><br></br> &nbsp; &nbsp; &nbsp; &nbsp; 
                          <button type="button" value={country.name.common.toString()} onClick={handleSearch}>Show</button><br></br>
                          <br></br>
                        </li>))}
                    </div>)


                } else if (filtered === '') {
                  return (console.log("empty"))

                } else {
                  return (console.log("all"))
                }
            })()}

        </div>


    </div> 
  );
}

export default App
