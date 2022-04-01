import React, { } from 'react'


const Course = ({ course }) => {
  
  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total  content={course.parts} />
    </div>
  )
}


const Header = (props) => {
  
  return (
    <>
    <h1>{props.name}</h1>
    </>
  )
}


const Total = ({ content }) => {

  const total = content.reduce((sum, part) => {
      sum = sum + part.exercises;
      return sum
  }, 0)

  return (
      <>
          <h3>Total of {total} exercises</h3>
      </>
  )
}


const Part = ({ part }) => {

return(
  <>
    <p>
      {part.name} {part.exercises}
    </p>
  </>
  )
}
  

const Content = ({ content }) => {

  return (
      <>
          {content.map((part) => 
          <Part key={part.id} part={part} />
          )}
      </>
  )
}

export default Course