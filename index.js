const usage =
  "Usage:\n\
-m List available modes\n\
-m [str] Status updates for a specified mode\n\
-l [str] Status updates for specified lines\n\
-d Disruptions (use in conjunction with -m or -l)";
const requests = require("./requests");
const argv = require("yargs").usage(usage).argv;
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
    try {
      requests[defaultFunc]();
    } catch (err) {
      console.log(usage);
    }
  } else {
    requests[otherFunc](mainArg);
  }
};

if (argv.m) {
  handler(argv.m, "getModes", "getModeStatus", argv.d, "getModeDisruptions");
} else if (argv.l) {
  handler(argv.l, null, "getLineStatuses", argv.d, "getLineDisruptions");
}
