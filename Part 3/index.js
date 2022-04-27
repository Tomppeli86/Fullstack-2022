
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "we",
        "number": "3535",
        "id": 3535
      },
      {
        "name": "3535",
        "number": "353535",
        "id": 353535
      },
      {
        "name": "asdasd",
        "number": "343444",
        "id": 353536
      },
      {
        "name": "asas",
        "number": "3434",
        "id": 353537
      },
      {
        "name": "asd",
        "number": "12456",
        "id": 12456
      }
  ]


  app.get('/', (req, res) => {
    res.send('<h1>Hell Noyyy World!</h1>')
  })
  

  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })



  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)
  
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })


  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
    persons = persons.concat(note)
    response.json(note)
  })
  

  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
  })
  


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// handle requests with unknown endpoint
app.use(unknownEndpoint)

// Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.message.includes('ObjectId')) {
        return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})