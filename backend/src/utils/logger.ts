import pino from "pino";

const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: 'dd-mm-yyyy HH:MM:ss',
    ignore: 'pid,hostname'
  }
});

export { logger };
