// LOGGER
import chalk from "chalk";
import winston from "winston";
const logLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    logColors: {
        debug: 'blue',
        http: 'cyan',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta',
    },
}


export const logger = winston.createLogger({
    levels: logLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "info" : "debug",
            format: winston.format.combine(winston.format.colorize({ all: true, colors: logLevelsOptions.logColors }), winston.format.simple())
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warn",
            format: winston.format.simple(),
        }),
    ],
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    /*  req.logger.info(
        `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
     ); */
    next();
};

/* req.logger.info(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  ); */