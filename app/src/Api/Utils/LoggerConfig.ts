import winston from 'winston';

const formatWinston = winston.format.printf((info) => {
  return JSON.stringify({
    datetime: info.timestamp,
    level: info.level.toUpperCase(),
    message: info.message,
  });
});

export const loggerFormat = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), winston.format.json(), formatWinston);
