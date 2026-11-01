require('dotenv').config()
const app = require('./src/app')
const getMetrics = require('./src/config/getReport')
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('server running',PORT)
})

getMetrics()