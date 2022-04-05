import { useState } from 'react'


const App = () => {

  const [persons, setPersons] = useState( [
      { name: 'Arto Hellas',
        number: '666',
        id: 0 }
  ] ) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
 
  
  const handleName = (event)  => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event)  => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const clickName = (event)  => {
    event.preventDefault()
    console.log("name created", newName)
    console.log("name created", newNumber)
    console.log('button clicked', event.target)
    

    setNewName('')
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      
      <div >Name: &nbsp; &nbsp; 
        <input value={newName} type="text" name="name"
              onChange={handleName}/>
              <br></br> 
              </div>

              <br></br>
              
              <div>Number:
        <input value={newNumber} type="text" name="number"
              onChange={handleNumber}/>
              <br></br>
              </div>

      <button type="submit" onClick={clickName}>Add</button>
      

        <h2>Numbers</h2>
        
        <div>
        {persons.map(function(d, idx){
         return (<li key={idx}>{d.name}&nbsp;{d.number}</li>)
        })}
        </div>

    </div>
  );
}

export default App