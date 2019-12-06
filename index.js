const usage =
  "Usage:\n\
-m List available modes\n\
-m [str] Status updates for a specified mode\n\
-l [str] Status updates for specified lines\n\
-d Disruptions (use in conjunction with -m or -l)";
const requests = require("./requests");
const argv = require("yargs").usage(usage).argv;
require("dotenv").config();

if (argv.s) {
  argv.m ? requests.getStopsForSpecificMode(argv) : requests.getStops(argv.s);
} else if (argv.m) {
  argv.d ? requests.getModeDisruptions(argv.m) : requests.getModes(argv.m);
} else if (argv.l) {
  argv.d
    ? requests.getLineDisruptions(argv.l)
    : requests.getLineStatuses(argv.m);
}
