
const winston = require("winston");

const logger = winston.createLogger({
  // Minimum severity level to record
  level: "info",

  // Metadata attached to every log
  defaultMeta: {
    service: "incident-copilot"
  },

  // How log entries are formatted
  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.errors({
      stack: true
    }),

    winston.format.json()
  ),

  // Where logs are written
  transports: [
    // new winston.transports.Console(),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});

module.exports = logger;
