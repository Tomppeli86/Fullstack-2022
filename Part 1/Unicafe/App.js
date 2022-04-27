import { useState } from 'react'
import './index.css'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

function hideShow() {
  document.getElementById('clear').style.visibility = "hidden";
  document.getElementById('stats').style.visibility = "visible";
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  

  const goodClick = () => {  
    hideShow()
    setGood(good + 1)
  }
  
  const neutralClick = () => {
    hideShow()
    setNeutral(neutral + 1)
  }
  
  const badClick = () => {
    hideShow()
    setBad(bad + 1)
  }

  
    
  return (
    <div>

      <h1>Give feedback</h1>
    
      <button onClick={goodClick}>Good</button> 
      <button onClick={neutralClick}>Neutral</button>
      <button onClick={badClick}>Bad</button>
      
      <h1>Statistics</h1>
      <p id="clear">
        No feedback given yet.
      </p>

      <div class="statit">
        <p id="stats" > 
      
        &nbsp;&nbsp;good &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          {good} 
        <br></br>

        &nbsp;&nbsp;neutral &nbsp;&nbsp;&nbsp; {neutral}
        <br></br>

        &nbsp;&nbsp;bad &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          {bad}   
        <br></br>

        &nbsp;&nbsp;all &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {(good + neutral + bad)} 
        <br></br>

        &nbsp;&nbsp;avarage &nbsp;&nbsp;&nbsp;
          {((good) + (neutral/2)) / (good + neutral + bad)}
        <br></br>

        &nbsp;&nbsp;positive &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {good / (good + neutral + bad) * 100 }
        <br></br>

        </p>
      </div>

    </div>
  )
}

export default App


