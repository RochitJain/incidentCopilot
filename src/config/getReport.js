const axios = require('axios')
const logger = require('./logger')
const parseMetrics = require('./metricsParser')

async function getMetrics() {
    await axios.get(process.env.GET_METRICS_URL).then((res)=>{
        const metrics = parseMetrics(res.data)
        console.log(metrics)
    }).catch((err)=>{
        logger.error(err)
    })
}

module.exports = getMetrics