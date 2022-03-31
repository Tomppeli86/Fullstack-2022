import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  
  const anecdotes =  [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

   
  const getSelected = () => {

    const nro = Math.floor(Math.random() * 7);
      
        if (setSelected() == nro) {
          const nro2 = Math.floor(Math.random() * 7);
            nro2 = nro
        }       
        if (setSelected() == nro) {
          const nro3 = Math.floor(Math.random() * 7);
            nro3 = nro
        }    
    setSelected(nro);  
  }


  const getVoted = ()  => {

    const copy = {...votes}
    copy[selected] +=1
    setVotes(copy)
  }


  const findMax = () => {
    let max = 0
    let index = NaN

    const compare = (val, ind) => {
      if(val > max){
        max = val;
        index = ind
      }
    }
    votes.forEach(compare)
    return index
  }

  let top = findMax()

  return (
    
    <div>
        <h1>Anecdote of the day</h1>
        <h2>{anecdotes[selected]}</h2>
        
        <br></br><br></br><br></br>
        <button onClick={getSelected}>Moarboar wants moar</button>
        <p>Rating: {votes[selected]}</p>
        <button onClick={getVoted}>vote</button>

        <h1>The top dog</h1>
        <h2>{anecdotes[top]}</h2>
        <p>Rating: {votes[top]}</p>
    </div>
  )
}

export default App
