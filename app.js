const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.options('*', cors())

//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

require('dotenv/config');

//Routes
const categoriesRoutes = require('./routes/categories')
const ordersRoutes = require('./routes/orders')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)

//Database
mongoose.connect(process.env.CONNECTION_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'E-COMMERCEDB'
})
.then( () => {
  console.log('database connection is ready ...')
})
.catch( (err) => {
  console.log(err)
})

//Server
app.listen(3000, () => {
  console.log('server is running now in http://localhost:3000')
})