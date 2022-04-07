import { useState } from 'react'

const App = () => {
  
  const [persons, setPersons] = useState( [  ] ) 

  const [personsToShow, setPersonsToShow] = useState( [ 
    { name: 'Example', number: '1234567', id: 1 }
    ] )

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  var clickCounter = 0;

  const handleName = (event)  => {
    setNewSearch('')
    setNewName(event.target.value)
  }
  const handleNumber = (event)  => {
    setNewSearch('')
    setNewNumber(event.target.value)
  }

  const handleSearch = (event)  => { 
    setNewSearch(event.target.value)
    const keyword = (event.target.value)
    console.log(personsToShow)

      if (keyword !== '') {
          const results = persons.filter((user) => {
          return user.name.toLowerCase().startsWith(keyword.toLowerCase());  
          });
          setPersonsToShow(results)

      } else {
          setPersonsToShow(persons)
      }
  }
    

  const clickName = (event)  => {
      event.preventDefault()
      console.log(clickCounter)
      
        if (newName.length === 0 || newNumber.length === 0) {
            alert("Can't have empty fields")
            return  }

      const newPersons = { name: newName, number: newNumber, id: parseInt(persons.lenght + 1)}
      let existingNumber = persons.filter(person => person.number === newPersons.number)[0]
    
        if (existingNumber) {
            alert("Number is already on the book")

        } else {
            setPersons(persons.concat(newPersons))
            setPersonsToShow(persons.concat(newPersons))

            clickCounter = clickCounter + 1;
            console.log(clickCounter)
        }
      setNewName('')
      setNewNumber('')
  }
  

  return (
    <div>
      <h2>The phonebook</h2>
        <form>  
          <div>Show:&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            <input 
              value={newSearch} 
              type="text" 
              name="searchfield"
              onChange={handleSearch}/>
            </div>  
        </form>
    
      <h3>Add a new person</h3>
        <form onSubmit={clickName}>
          <label>Name: &nbsp; &nbsp; &nbsp; &nbsp;
            <input
              key="namekey"
              value={newName} 
              type="text" 
              name="namefield"
              onChange={handleName}/>
              <br></br> 
          </label>
                  <br></br>     
          <label>Number: &nbsp; &nbsp;
            <input
              key="phonenumber"
              value={newNumber} 
              type="text" 
              name="numberfield"
              onChange={handleNumber}/>
              <br></br>
          </label>
          <button type="submit">Add</button>  
        </form> 

      <h3>Numbers on the book</h3>
      <div> 
        <ol> <p>Name &nbsp; &nbsp; &nbsp; &nbsp; Number</p>
          {personsToShow.map((person) => (
            <li key={person.id}>
                {person.name} &nbsp;- &nbsp; 
                {person.number}
            </li>))}
        </ol> 
      </div>
    </div> 
  );
}

export default App