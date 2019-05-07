const express = require('express')
const cors = require('cors')
const app = express()

const compression = require('compression')
const path = require('path');
const graphqlHTTP = require('express-graphql')
const schema = require ('../schema.js')
const mongoose = require('mongoose')


mongoose.connect('mongodb://user1:abc123@ds151876.mlab.com:51876/recycles')
mongoose.connection.once('open', ()=>{
	console.log('connected to db')
})

app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(compression())


app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true
}))

const PORT = 3010 || process.env.PORT
app.listen(PORT, ()=>{
	console.log('Listening on port 3010 now')
})
