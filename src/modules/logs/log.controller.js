const logService = require('./log.service')


async function getLogController(req, res) { 
    
    const getLogs = await logService.getAllLogsService()
    res.status(200).json(getLogs)
}

// async function addLogController(req, res) {
   
//     res.status(200).json({})
    
// }



module.exports = {getLogController}