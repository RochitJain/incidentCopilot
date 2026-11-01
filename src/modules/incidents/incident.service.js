const incidentRepository = require('./incident.repository')

async function getAllIncident(){
    return await incidentRepository.findAllIncident()
}

async function getIncidentLogs(id) {
    return await incidentRepository.getIncidentLogs(id)
}

async function addIncidentLogs(log_id, incident_id) {
    return await incidentRepository.addIncidentLogs(log_id, incident_id)
}

async function getIncidentById(id){
    return await incidentRepository.findIncidentById(id)
}
async function updateIncidentDetails(body,id) {
    return await incidentRepository.updateIncidentDetails(body,id);
}
async function addIncident(body) {
    return await incidentRepository.addIncident(body)
}

async function updateIncident(body,id) {
    return await incidentRepository.updateIncident(body,id)
}

module.exports = {getAllIncident, addIncident, updateIncident, getIncidentById, updateIncidentDetails, addIncidentLogs, getIncidentLogs}