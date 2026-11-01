const connection = require("../../config/db");
const AppError = require("../../utils/AppError");

async function addLogs(data) {
  try {
    const {
      level,
      service,
      method,
      endpoint,
      statusCode,
      durationMs,
      message,
      requestId
    } = data;
    const result = await connection.query(
      `Insert into logs (level, service, method, endpoint, status_code, duration_ms, message, metaData) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `,
      [level, service, method, endpoint, statusCode, durationMs, message, JSON.stringify({requestId})],
    );
    return result.rows;
  } catch (err) {
    console.log(err)
    throw new AppError(err, 500)
    
  }
}

async function getLogs() {
  try {
    const result = await connection.query(`SELECT
    id,
    timestamp,
    duration_ms,
    status_code,
    endpoint
FROM logs
WHERE endpoint LIKE '%/logs%'
ORDER BY id DESC
LIMIT 10;`);
    return result.rows;
  } catch (err) {
    throw new AppError(err, 500)
  }
}

module.exports = { addLogs, getLogs };
