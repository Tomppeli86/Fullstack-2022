import { useState } from 'react'


const App = () => {
  

  const [persons, setPersons] = useState( [
      { name: 'Arto Hellas',
        number: '666',
        id: 0} ] ) 
   
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  const handleName = (event)  => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event)  => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleSearch = (event)  => {
    setNewSearch(event.target.value)
    const keyword = (event.target.value)
    const copylist = [...persons];
    
    if (keyword !== '') {
      const results = persons.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());  
          });
          setPersons(results)
          console.log(results)
        }
      console.log('show allllll')
      copylist = persons;
      
    }
    

  const clickName = (event)  => {
    event.preventDefault()

    if (newName.length === 0 || newNumber.length === 0) {
      alert("Can't have empty fields")
      return
    }
    console.log("name created", newName)
    console.log("number created", newNumber)
    console.log('button clicked', event.target)

    const newPersons = { name: newName, number: newNumber, id: parseInt(persons.lenght + 1)}
    let existingNumber = persons.filter(person => person.number === newPersons.number)[0]
    
    if (existingNumber) {
      console.log('exists')
      
      alert("Number is on the list")
        } else {
          setPersons(persons.concat(newPersons))
        }
        setNewName('')
        setNewNumber('')
  }
  
  return (
    <div>
      <h2>Thick phonebook</h2>
        <form>
        <div>
          Show: <input value={newSearch} type="text" name="search"
              onChange={handleSearch}/>
        </div>
      </form>
      

      <h3>Add a new thang.</h3>

      <form onSubmit={clickName}>
      <label>Name: &nbsp; &nbsp; 
        <input value={newName} type="text" name="name"
              onChange={handleName}/>
              <br></br> 
              </label>

              <br></br>
              
              <label>Number:
        <input value={newNumber} type="text" name="number"
              onChange={handleNumber}/>
              <br></br>
              </label>

      <button type="submit">Add</button>
      </form>
      

        <h3>Numbas on da book</h3>
        
        <div className="user-list">
          <ol>
        {persons.map((person) => (
          <li>{person.name}{person.number}</li>
          ))}
        </ol>
      </div>

    </div>
  );
}

export default App