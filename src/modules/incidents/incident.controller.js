const incidentService = require('./incident.service')

async function getIncident(req,res){
    const result = await incidentService.getAllIncident()
    res.status(200).json(result)

}
async function getIncidentById(req,res){
    const result = await incidentService.getIncidentById(req.params.id)
    res.status(200).json(result)
}

async function updateIncidentDetails(req, res) {
    const result = await incidentService.updateIncidentDetails(req.body,req.params.id)
    res.status(203).json(result)
}

async function addIncident(req,res) {
    const result = await incidentService.addIncident(req.body)
    res.status(201).json(result)
}

async function updateIncident(req, res) {
    const result = await incidentService.updateIncident(req.body,req.params.id)
    res.status(204).json(result)
}

module.exports = {getIncident, addIncident, updateIncident, getIncidentById, updateIncidentDetails}