const express = require('express')
const router = express.Router()
const incidentController = require('./incident.controller')

router.get('/incident', incidentController.getAllIncident)
router.post('/incident',incidentController.addIncident)
router.put('/incident-status/:id/status',incidentController.updateIncident)
router.get('/incident/:id', incidentController.getIncidentById)
router.put('/incident-details/:id', incidentController.updateIncidentDetails)

router.get('/incident/:id/logs', incidentController.getIncidentLogs)
router.post('/incident/:id/logs',incidentController.addIncidentLogs)

module.exports = router