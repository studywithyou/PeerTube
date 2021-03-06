// Thanks http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
'use strict'

const config = require('config')
const mkdirp = require('mkdirp')
const path = require('path')
const winston = require('winston')
winston.emitErrs = true

const logDir = path.join(__dirname, '..', '..', config.get('storage.logs'))
const label = config.get('webserver.host') + ':' + config.get('webserver.port')

// Create the directory if it does not exist
mkdirp.sync(logDir)

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: path.join(logDir, 'all-logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      label: label,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: true
})

logger.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}

// ---------------------------------------------------------------------------

module.exports = logger
