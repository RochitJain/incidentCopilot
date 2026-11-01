const AppError = require("../../utils/AppError");
const incidentService = require("./incident.service");

async function getAllIncident(req, res) {
  const result = await incidentService.getAllIncident();
  res.status(200).json(result);
}
async function getIncidentLogs(req, res) {
  if (!req.params.id) throw new AppError("id as parameter not present", 404);
  const result = await incidentService.getIncidentLogs(req.params.id);

  res.status(200).json(result);
}

async function addIncidentLogs(req, res) {
  if (!req.params.id || !req.body)
    throw new AppError("id or body not present", 404);
  const result = await incidentService.addIncidentLogs(
    req.body.log_id,
    req.params.id,
  );

  res.status(201).json(result);
}

async function getIncidentById(req, res) {
  if (!req.params.id) throw new AppError("id as parameter not present", 404);
  const result = await incidentService.getIncidentById(req.params.id);
  res.status(200).json(result);
}

async function updateIncidentDetails(req, res) {
  if (!req.params.id || !req.body)
    throw new AppError("id or body not present", 404);
  const result = await incidentService.updateIncidentDetails(
    req.body,
    req.params.id,
  );
  res.status(200).json(result);
}

async function addIncident(req, res) {
  if (!req.body) throw new AppError("body not present", 404);
  const result = await incidentService.addIncident(req.body);

  res.status(201).json(result);
}

async function updateIncident(req, res) {
  if (!req.params.id || !req.body)
    throw new AppError("id and body not present", 404);
  const result = await incidentService.updateIncident(req.body, req.params.id);

  res.status(200).json(result);
}

module.exports = {
  getAllIncident,
  addIncident,
  updateIncident,
  getIncidentById,
  updateIncidentDetails,
  getIncidentLogs,
  addIncidentLogs,
};
