const usage =
  "Usage:\n\
-m List available modes\n\
-m [str] Status updates for a specified mode\n\
-l [str] Status updates for specified lines\n\
-q [str] Search for stops (using their name)\n\
-s [str] List stops using their IDs \
  (more information is available here than with -q)";
const requests = require("./requests");
const argv = require("yargs").usage(usage).argv;
require("dotenv").config();

const principalArg = Object.keys(argv)[1];

switch (principalArg) {
  case "s":
    requests.getStops(argv);
    break;
  case "q":
    requests.searchStops(argv);
    break;
  case "m":
    typeof argv.m === "string"
      ? requests.getModeDisruptions(argv.m)
      : requests.getModes(argv.m);
    break;
  case "l":
    argv.m
      ? requests.getModeLines(argv.m)
      : requests.getLineDisruptions(argv.l);
    break;
  default:
    console.log(usage);
    break;
}
