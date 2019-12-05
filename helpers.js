exports.formatNames = name => {
  let words = name.split("-");
  words = words.map(word =>
    word === "tfl" ? "TfL" : word.charAt(0).toUpperCase()
  );
  return words.join(" ");
};
