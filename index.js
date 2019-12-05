const requests = require("./requests");
const argv = require("yargs").usage("Usage: -l").argv;
require("dotenv").config();

const handler = (args, defaultFunc, otherFunc) => {
  if (typeof args !== "string") {
    requests[defaultFunc]();
  } else {
    requests[otherFunc](args);
  }
};

if (argv.m) {
  handler(argv.m, "getModes", "getModeStatus");
} else if (argv.l) {
  handler(argv.l, "getLines", "getLineStatus");
}
