exports.formatNames = name => {
  let words = name.split("-");
  words = words.map(word =>
    specialNamesFormatting[word]
      ? specialNamesFormatting[word]
      : `${word.charAt(0).toUpperCase()}${word.substring(1, word.length)}`
  );
  return words.join(" ");
};

exports.listFormatter = body => body.map(({ id, name }) => `${name} (${id})`);

exports.disruptionFormatter = (args, body) =>
  body.map(({ description }) =>
    disruptionModeFormatter[args]
      ? disruptionModeFormatter[args](description.split(": "))
      : `\n${description}\n`
  );

exports.stopsFormatter = body =>
  body.matches.map(({ id, name, modes, zone }) => {
    let obj = { id, name, modes };
    if (zone) obj.zone = zone;
    return obj;
  });

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
