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

exports.disruptionFormatter = (args, body) => {
  if (args === "national-rail") {
    return body.map(({ type, description }) => ({
      category: type,
      description
    }));
  } else {
    return body.map(
      ({
        categoryDescription,
        description,
        affectedRoutes,
        affectedStops
      }) => ({
        category: categoryDescription,
        description: description,
        routes: affectedRoutesMapper(affectedRoutes),
        stops: affectedStopsMapper(affectedStops)
      })
    );
  }
};

const specialNamesFormatting = {
  tflrail: "TfL Rail",
  dlr: "DLR"
};

const affectedRoutesMapper = routes =>
  routes.map(route => this.formatNames(route.name));

const affectedStopsMapper = stops =>
  stops.map(stop => `${this.formatNames(stop.fullName)} ${stop.id}`);
