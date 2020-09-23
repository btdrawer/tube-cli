const formatNames = name =>
    name
        .split("-")
        .map(
            word =>
                specialNamesFormatting[word] ||
                `${word.charAt(0).toUpperCase()}${word.substring(
                    1,
                    word.length
                )}`
        )
        .join(" ");

const specialNamesFormatting = {
    tflrail: "TfL Rail",
    dlr: "DLR"
};

const disruptionModeFormatter = {
    bus: body =>
        body.length > 1
            ? {
                  road: body[0],
                  description: body[1]
              }
            : { description: body[0] },
    tube: body => ({ line: body[0], description: body[1] })
};

exports.listFormatter = body => body.map(({ id, name }) => `${name} (${id})`);

exports.disruptionFormatter = (args, body) =>
    body.map(({ description }) =>
        disruptionModeFormatter[args]
            ? disruptionModeFormatter[args](description.split(": "))
            : `\n${description}\n`
    );

exports.modesFormatter = body =>
    body.map(({ modeName }) => `${formatNames(modeName)} (${modeName})`);

exports.getStopsFormatter = body =>
    body.children.map(({ id, commonName, modes, lines }) => ({
        id,
        name: commonName,
        modes,
        lines: this.listFormatter(lines)
    }));

exports.searchStopsFormatter = body =>
    body.matches.map(({ id, name, modes, zone }) =>
        zone ? { id, name, modes, zone } : { id, name, modes }
    );
