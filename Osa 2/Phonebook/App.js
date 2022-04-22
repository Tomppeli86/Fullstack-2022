
import axios from 'axios'
import { useState, useEffect } from 'react'


const App = () => {

  
  const [persons, setPersons] = useState( [  ] ) 
  const [personsToShow, setPersonsToShow] = useState( [ { 
    name: 'Example', number: '0123456789', id: 1
    } ] )

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')



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
            } );
          setPersonsToShow(results)

      } else {
          setPersonsToShow(persons)
      }
  }


  const hook = () => {

    console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
  }
  useEffect(hook, [])






  const deleteNumber = (event) => {

      event.preventDefault()
      
      let removeIndex = event.target.value
      const deletePerson =  personsToShow.find( ({ id }) => id === parseInt(removeIndex) );

        if (window.confirm(`Delete number?`))  {

          axios
            .delete('http://localhost:3001/persons/'+(personsToShow.indexOf(deletePerson)))
            .then(response => {
                console.log(response)
              })

            personsToShow.splice(personsToShow.indexOf(deletePerson),1);
            setPersonsToShow(persons)
              console.log(personsToShow)
              console.log(persons)
              console.log(personsToShow.indexOf(deletePerson))

        } else {
            console.log("return") 
          return
      }
  }






  const clickName = (event)  => {

    event.preventDefault()
      
      if (newName.length === 0 || newNumber.length === 0) {
          alert("Can't have empty fields")
        return  }
    
    const newPersons = { name: newName, number: newNumber, id: parseInt(persons.length + 1)}
    let existingNumber = persons.filter(person => person.number === newPersons.number)[0]
    let existingId = persons.filter(person => person.id === newPersons.id)[0]

      if (existingNumber) {
          alert("Number is already on the book")
        return  }

            if (existingId) {
              const newPersons2 = { name: newName, number: newNumber, id: parseInt(persons.length + 1 + ({number: Math.random()}))}
              console.log("RNG ID")
                setPersons(persons.concat(newPersons2))
                setPersonsToShow(persons.concat(newPersons2))
            } else {
                setPersons(persons.concat(newPersons))
                setPersonsToShow(persons.concat(newPersons))
            }

        axios
          .post('http://localhost:3001/persons', newPersons)
          .then(response => {
            console.log(response)
          })

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
          </label> <br></br>

          <label>Number: &nbsp; &nbsp;
            <input
              key="phonenumber"
              value={newNumber} 
              type="text" 
              name="numberfield"
              onChange={handleNumber}/>
              <br></br><br></br>
          </label>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
          <button type="submit">Add</button>  
        </form> 

        <br></br>
      <h3>Numbers in the book</h3>
        <div> 
          <ol> <p>Name &nbsp; &nbsp; &nbsp; &nbsp; Number</p>
            {personsToShow.map((person) => (
              <li key={person.number}>
                {person.name} &nbsp;- &nbsp; 
                {person.number} &nbsp; &nbsp;<button type="button" value={person.id} onClick={deleteNumber}>Delete</button><br></br>
              </li>))}
          </ol> 
        </div>
    </div> 
  );
}

export default App
