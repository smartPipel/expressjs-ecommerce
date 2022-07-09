const { format, transports, createLogger } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;
const consoleTransport = new transports.Console();

module.exports = createLogger({
  transports: [
    consoleTransport,
    new transports.File({ filename: "logs/info.log", level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
  format: combine(
    label({ label: "User log" }),
    timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    colorize({ colors: { info: "green", error: "red", warn: "yellow" } }),
    printf(
      (info) =>
        `${info.timestamp}  ${info.method}  ${info.level}  ${info.label} | ${info.message} | ${info.ip} | ${info.url}`
    )
  ),
});
