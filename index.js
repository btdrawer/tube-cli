const requests = require("./requests");
const argv = require("yargs").usage("Usage: -l").argv;
require("dotenv").config();

const handler = (
  mainArg,
  defaultFunc,
  otherFunc,
  disruptionArg,
  disruptionFunc
) => {
  if (disruptionArg) {
    requests[disruptionFunc](mainArg);
  } else if (typeof mainArg !== "string" && typeof mainArg !== "number") {
    requests[defaultFunc]();
  } else {
    requests[otherFunc](mainArg);
  }
};

if (argv.m) {
  handler(argv.m, "getModes", "getModeStatus", argv.d, "getModeDisruptions");
} else if (argv.l) {
  handler(argv.l, null, "getLineStatuses", argv.d, "getLineDisruptions");
}
