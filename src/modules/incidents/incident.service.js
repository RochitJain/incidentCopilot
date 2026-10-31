const incidentRepository = require('./incident.repository')

async function getAllIncident(){
    const res = await incidentRepository.findAllIncident()
    return res
}

async function getIncidentById(id){
    const res = await incidentRepository.findIncidentById(id)
    return res
}
async function updateIncidentDetails(body,id) {
    const res = await incidentRepository.updateIncidentDetails(body,id)
    return res;
}
async function addIncident(body) {
    const res = await incidentRepository.addIncident(body)
    return res
}

async function updateIncident(body,id) {
    const res = await incidentRepository.updateIncident(body,id)
    return res
}

module.exports = {getAllIncident, addIncident, updateIncident, getIncidentById, updateIncidentDetails}