const express = require('express')
const logRouter = express.Router()
const logController = require('./log.controller')

logRouter.get('/logs', logController.getLogController)

module.exports = logRouter