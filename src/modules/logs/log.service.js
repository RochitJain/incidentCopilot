const logRepository = require("./log.repository");

async function getAllLogsService() {
  const result = await logRepository.getLogs()
  return result
}

async function addLogsService(data) {
  const res = await logRepository.addLogs(data);
  return res;

}

module.exports = { getAllLogsService, addLogsService };
