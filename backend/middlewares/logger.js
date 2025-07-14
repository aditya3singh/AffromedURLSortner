const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'logs.txt');

module.exports = (req, res, next) => {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Logging failed:', err);
    });
    next();
};
