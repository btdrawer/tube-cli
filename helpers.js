const specialFormatting = {
  tflrail: "TfL Rail",
  dlr: "DLR"
};

exports.formatNames = name => {
  let words = name.split("-");
  words = words.map(word =>
    specialFormatting[word]
      ? specialFormatting[word]
      : `${word.charAt(0).toUpperCase()}${word.substring(1, word.length)}`
  );
  return words.join(" ");
};
