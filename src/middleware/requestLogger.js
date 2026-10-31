
const crypto = require("crypto");
const logger = require("../config/logger");
const logService = require('../modules/logs/log.service')
const {activeRequests,httpRequestDuration,httpRequestTotal} = require('../config/metrics')

const requestLogger = (req, res, next) => {
    // Generate unique ID for each request
    const requestId = crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader("X-Request-ID", requestId);
    if (req.path === "/metrics") {
    return next();
    }
    activeRequests.inc()
    // Record request start time
    const startTime = process.hrtime.bigint();
    // Wait until response finishes
    res.on("finish", async () => {
        const endTime = process.hrtime.bigint();
        // Convert nanoseconds into milliseconds
        activeRequests.labels()
        const durationMs =
            Number(endTime - startTime) / 1_000_000;

   
        const statusCode = res.statusCode;

        const durationSeconds = Number(endTime - startTime) / 1e9;

        const label = {
            method: req.method,
            route: req.route?.path || req.path,
            status_code: String(statusCode)
        }
        httpRequestTotal.inc(label)
        httpRequestDuration.observe(label, durationSeconds)
        activeRequests.dec()
        // Determine log level
        const level =
            statusCode >= 500 ? "error" :
            statusCode >= 400 ? "warn" :
            "info";

        const logData = {
            level,
            message: "HTTP request completed",
            requestId,
            method: req.method,
            endpoint: req.originalUrl,
            statusCode,
            durationMs: Number(durationMs.toFixed(2))
        }
        
        logger.log(logData);
        try{
            await logService.addLogsService(logData)
        }catch(err){
            throw new Error(err)
        }
    });
    
    next();
};

module.exports = requestLogger;
