

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

      if (keyword !== '') {
        const results = persons.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());}
      )
          setPersonsToShow(results)
      } else {
          setPersonsToShow(persons)
      } 
  }


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)
     })
  }
  useEffect(hook, [])



  const deleteNumber = (event) => {

    event.preventDefault()
    let idnumber = event.target.value

    if (window.confirm(`Delete number?`)) {
      const deletePerson = persons.findIndex( ({ id }) => id === parseInt(idnumber));
        console.log(idnumber)
        console.log(deletePerson)

      axios
        .delete('http://localhost:3001/api/persons/'+(idnumber))
        .then(response => {
          console.log(response) 
          { 
          axios
            .get('http://localhost:3001/api/persons')
            .then(response => {
              console.log('promise fulfilled')
              setPersons(response.data)
              setPersonsToShow(response.data)
          }) 
        }
      })
    }
  }


  
  const clickName = (event)  => {

    event.preventDefault()
    const numberId = Number.parseInt(newNumber)

      if (newName.length === 0 || newNumber.length === 0) {
          alert("Can't have empty fields")
        return  }
      if (Number.isInteger(numberId)) {
          console.log("is number, is niiiice")
      } else {
          alert("Only numbers between 0-9 are allowed as phonenumbers") 
        return  }

    const newPersons2 = { name: newName, number: newNumber }
    const newPersons = { name: newName, number: newNumber, id: parseInt(numberId)}
    let existingNumber = persons.filter(person => person.number === newPersons.number)[0]
    let existingId = persons.filter(person => person.id === newPersons.id)[0]
    let existingName = persons.filter(person => person.name === newPersons.name)[0]
    
    console.log(newPersons.name)

      if (existingNumber) {
          alert("Number is already on the book")
          return  }
      if (existingId) {
          alert("Duplicate I.D")
          newPersons.id = persons.lenght + 10
      }

      if (existingName) {
          (window.confirm(newPersons.name + ` is already on the phonebook, replace old number with new one?`)) 
            axios
              .put('http://localhost:3001/api/persons/'+((persons.indexOf(existingName))+1),newPersons)
              .then(response => {
              console.log(response)
                {
                axios
                  .get('http://localhost:3001/api/persons')
                  .then(response => {
                  console.log('promise fulfilled')
                  setPersons(response.data)
                  setPersonsToShow(response.data)
                }) 
              }
            })
          setNewName('')
          setNewNumber('')
        return

      } else {
        axios
          .post('http://localhost:3001/api/persons', newPersons2)
          .then(response => { 
            console.log(response.data)
            setPersons(persons.concat(newPersons))
            setPersonsToShow(persons.concat(newPersons))
        })
      }
    setNewName('')
    setNewNumber('')
  }


  return (

    <div>
        <h2>The phonebook</h2>
        <form> <div>Show:&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            <input value={newSearch} 
              type="text" 
              name="searchfield"
              onChange={handleSearch}/></div> 
        </form>
    

          <h3>Add a new person</h3>
          <form onSubmit={clickName}>
              <label>Name: &nbsp; &nbsp; &nbsp; &nbsp;
              <input key="namekey"
                 value={newName} 
                 type="text" 
                 name="namefield"
                 onChange={handleName}/>
                 <br></br> </label> <br></br>
              <label>Number: &nbsp; &nbsp;
              <input key="phonenumber"
                  value={newNumber} 
                  type="text" 
                  name="numberfield"
                  onChange={handleNumber}/>
                  <br></br><br></br> </label>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; 
                  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
            <button type="submit"> Add</button>  
            </form> 


          <br></br><h3>Numbers in the book</h3><div> <ol> 
          <p>Name &nbsp; &nbsp; &nbsp; &nbsp; Number</p>
              {personsToShow.map((person) => (
                <li key={person.number}>
                {person.name} &nbsp;- &nbsp; 
                {person.number} &nbsp; &nbsp;
                <button type="button" 
                value={person.id} onClick={deleteNumber}>
              Delete</button><br></br> </li>))}</ol> 
          </div>
    </div> 

  );
}
export default App
