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


let body = {
    "name": "Dan Abramov",
}


// console.log(body.name )

// console.log(phonebook)

phonebook.forEach( element => console.log(element.name !== body.name))

// if (body.name in phonebook) {
//     console.log(body.name)
// }

for (let i = 0; i < phonebook.length; i++) {
    if (phonebook[i].name === body.name) {
        console.log('index:', i, 'duplicate name found')
    }
}