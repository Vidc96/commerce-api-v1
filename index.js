const express = require('express')
const app = express()

app.use(express.json())

let supermarketProducts = [
  {
    id: 1,
    name: 'Apples',
    price: '2.99 USD',
    important: true,
    date: new Date('2023-09-30 14:30:00'),
  },
  {
    id: 2,
    name: 'Milk',
    price: '1.99 USD',
    important: true,
    date: new Date('2023-09-10 08:45:00'),
  },
  {
    id: 3,
    name: 'Bread',
    price: '2.49 USD',
    important: false,
    date: new Date('2023-09-15 16:15:00'),
  },
  {
    id: 4,
    name: 'Eggs',
    price: '3.99 USD',
    important: false,
    date: new Date('2023-09-25 10:00:00'),
  },
  // Add more objects here...
];

// const app = express.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(supermarketProducts))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hi</h1>')
})

app.get('/api/products', (request, response) => {
  response.json(supermarketProducts)
})

app.get('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const product = supermarketProducts.find(product => product.id === id)

  if(product) {
    response.json(product)
  } else {
    response.status(404).end()
  }
 
})

app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const product = supermarketProducts.filter(product => product.id !== id)
  
  response.status(204).end()
})

app.post('/api/products', (request, response) => {
  const product = request.body

  const ids = supermarketProducts.map( product => product.id)
  const LastId = Math.max(...ids)

  const newProduct = {
    id: LastId + 1,
    name: product.name,
    price: product.price,
    important: typeof product.important !== undefined ? product.important : false, 
    date: new Date()
  }

  supermarketProducts = supermarketProducts.concat(newProduct)
    
  response.json(newProduct)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})