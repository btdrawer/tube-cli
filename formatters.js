exports.formatNames = name => {
  let words = name.split("-");
  words = words.map(word =>
    specialNamesFormatting[word]
      ? specialNamesFormatting[word]
      : `${word.charAt(0).toUpperCase()}${word.substring(1, word.length)}`
  );
  return words.join(" ");
};

exports.statusFormatter = body =>
  body.map(({ id, name, lineStatuses, disruptions }) => ({
    name: `${name} (${id})`,
    status: lineStatuses.length > 0 ? lineStatuses : "Good service",
    disruptions: disruptions.length > 0 ? disruptions : "None"
  }));

exports.disruptionFormatter = body =>
  body.map(({ description }) => {
    let arr = description.split(": ");
    return {
      line: arr[0],
      description: arr[1]
    };
  });

const specialNamesFormatting = {
  tflrail: "TfL Rail",
  dlr: "DLR"
};
