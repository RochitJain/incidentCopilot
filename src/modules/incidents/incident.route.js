const express = require('express')
const router = express.Router()
const incidentController = require('./incident.controller')

router.get('/incident', incidentController.getIncident)
router.post('/incident',incidentController.addIncident)
router.put('/incident-status/:id/status',incidentController.updateIncident)
router.get('/incident/:id', incidentController.getIncidentById)
router.put('/incident-details/:id', incidentController.updateIncidentDetails)

module.exports = router