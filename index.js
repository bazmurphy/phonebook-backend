let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


const express = require('express')
const app = express()

app.use(express.json())

// const nodemon = require('nodemon')

// morgan middleware
const morgan = require('morgan')

// need to define a custom token to get the Request Body
morgan.token('body', request => {
    return JSON.stringify(request.body)
})

// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// http://localhost:3001/
app.get('/', (request, response) => {
    response.send('<h1>FullStackOpen Phonebook Backend</h1>')
})

// http://localhost:3001/api/info
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>`)
})

// http://localhost:3001/api/persons
app.get('/api/persons', (request,response) => {
    response.json(phonebook)
})

// http://localhost:3001/api/persons/1
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person =  phonebook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


const generateId = () => {
    return Math.ceil(Math.random() * 100)
}

app.post('/api/persons', (request, response) => {

    const body = request.body
    // console.log('body:', body)
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    for (let i = 0; i < phonebook.length; i++) {
        if (phonebook[i].name === body.name) {
            // console.log('found duplicate name')
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    phonebook = phonebook.concat(person)

    response.json(person)

})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})