const requests = require("./requests");
const argv = require("yargs");
require("dotenv").config();

argv
    .command(["modes", "m"], "list available modes", {}, () =>
        requests.getModes()
    )
    .command(
        ["lines <mode>", "l"],
        "get a list of lines for a given mode",
        {},
        ({ mode }) => requests.getModeLines(mode)
    )
    .command(
        ["status", "s"],
        "get statuses",
        yargs =>
            yargs
                .option("modes", {
                    alias: "m",
                    describe: "get statuses for the specified modes"
                })
                .option("lines", {
                    alias: "l",
                    describe: "get statuses for the specified lines"
                }),
        ({ modes, lines }) =>
            modes
                ? requests.getModeDisruptions(modes)
                : requests.getLineDisruptions(lines)
    )
    .command(
        ["query <stops> [modes]", "q"],
        "search for stops using their names",
        {},
        ({ stops, modes }) => requests.searchStops({ stops, modes })
    )
    .command(
        ["stops <ids>", "S"],
        "get detailed information on stops using their IDs.",
        {},
        ({ ids }) => requests.getStops(ids)
    ).argv;
