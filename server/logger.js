const winston = require('winston');

// Define the format for logging
const logFormat = winston.format.combine(
  winston.format.timestamp({ format:'YYYY-MM-DD HH:MM:SS'}),
  winston.format.simple()
);

// Create a logger instance with a file transport
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log' })
  ]
});



module.exports = logger;
