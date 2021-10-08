import logger from 'pino';
import pinoHttp from 'pino-http'
import dayjs from 'dayjs';

const BASE_LOGGER = {
  prettyPrint: { colorize: true },
  base: {
    pid: false,
  },
  timestamp: () => `,'time':'${dayjs().format()}'`,
}

export const requestLogger = pinoHttp({
  ...BASE_LOGGER,
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return req;
    },
  },
});

const log = logger(BASE_LOGGER);

export default log;
