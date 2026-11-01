const AppError = require('../../utils/AppError')
const logService = require('./log.service')


async function getLogController(req, res) { 
    
    const getLogs = await logService.getAllLogsService()
    res.status(200).json(getLogs)
}

// async function addLogController(req, res) {
   
//     res.status(200).json({})
    
// }

async function addLogsController(req, res) {
        const result = await logService.addLogsService(req.body)
        if(!result) throw new AppError('Log not added', 400)
        res.status(201).json(result)
        
}



module.exports = {getLogController, addLogsController}