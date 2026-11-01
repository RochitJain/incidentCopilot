const express = require('express')
const app = express()
const logRouter = require('./modules/logs/log.route')
const requestLogger = require('./middleware/requestLogger')
const {register} = require('./config/metrics')
const incidentRouter = require('../src/modules/incidents/incident.route')
const errorMiddleware = require('./middleware/error.middleware')

app.use(express.json())
app.use(requestLogger)
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});
app.use('/api/v1',logRouter)
app.use('/api/v1',incidentRouter)
app.use(errorMiddleware)



module.exports= app