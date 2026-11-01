const express = require('express')
const logRouter = express.Router()
const logController = require('./log.controller')

logRouter.get('/logs', logController.getLogController)
logRouter.post('/logs/injest', logController.addLogsController)

module.exports = logRouter