const pool = require("../../config/db");
const AppError = require("../../utils/AppError");

async function findAllIncident() {
    const res = await pool.query(`Select * from incidents`);
    return res.rows;
}

async function getIncidentLogs(incident_id) {
    const res = await pool.query(`Select l.* from incident_logs il inner join logs l 
      on l.id = il.log_id where il.incident_id = $1`, [incident_id])
    return res.rows
}

async function addIncidentLogs(log_id, incident_id) {
    const res = await pool.query(`Insert into incident_logs (incident_id, log_id) VALUES ($1, $2)
      ON CONFLICT (incident_id, log_id) DO NOTHING RETURNING *`
      , [incident_id, log_id])
      if(!res.rows.length) throw new AppError('Already log and incident present', 409)
    return res.rows
}

async function findIncidentById(id) {
    const res = await pool.query(`Select * from incidents where id = $1`, [id]);
    return res.rows;
}

async function updateIncidentDetails(body, id) {
    const { title, description, service, severity } = body;
    const res = await pool.query(
      `UPDATE incidents set 
            title = COALESCE($1,title),
            description = COALESCE($2,description),
            service = COALESCE($3,service),
            severity = COALESCE($4,severity),
            updated_at = NOW() 
            where id = $5 RETURNING *`,
      [title, description, service, severity, id],
    );
    return res.rows;
}

async function addIncident(body) {
    const { title, description, service, severity } = body;
    const res = await pool.query(
      `Insert into incidents (title, description, service, severity) 
        VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, description, service, severity],
    );

    return res.rows;
}

async function updateIncident(body, id) {

    const status = body.status;
    const res = await pool.query(
      `
        Update incidents set status = $1:: VARCHAR, 
            resolved_at = CASE
                WHEN $1:: VARCHAR = 'RESOLVED' then NOW()
                ELSE resolved_at
            END,
            updated_at = NOW()  where id = $2 RETURNING *`,
      [status, id],
    );
    return res.rows;
}

module.exports = {
  findAllIncident,
  addIncident,
  updateIncident,
  findIncidentById,
  updateIncidentDetails,
  getIncidentLogs,
  addIncidentLogs
};
