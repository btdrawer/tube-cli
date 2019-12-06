const request = require("request");
const urlConstructor = (uri, params) => {
  let url = `https://api.tfl.gov.uk${uri}?app_id=${process.env.app_id}&app_key=${process.env.app_key}`;
  if (params) {
    Object.keys(params).forEach(key => {
      url += `&${key}=${params[key]}`;
    });
  }
  return url;
};
const {
  formatNames,
  listFormatter,
  disruptionFormatter,
  stopsFormatter
} = require("./formatters");

const sendRequest = (uri, params, formatter, isEmptyString) =>
  request(urlConstructor(uri, params), (err, res, body) => {
    if (err) throw err;
    else if (body.length > 2) {
      formatter(JSON.parse(body)).forEach(item => console.log(item));
    } else {
      console.log(isEmptyString);
    }
  });

exports.getModeDisruptions = args =>
  sendRequest(
    `/Line/Mode/${args}/Disruption`,
    null,
    body => disruptionFormatter(args, body),
    "There is currently a good service for the specified parameters."
  );

exports.getModes = () =>
  sendRequest("/Line/Meta/Modes", null, body =>
    body.map(({ modeName }) => `${formatNames(modeName)} (${modeName})`)
  );

exports.getModeStatus = args =>
  sendRequest(`/Line/Mode/${args}`, null, listFormatter);

exports.getLineDisruptions = args =>
  sendRequest(
    `/Line/${args}/Disruption`,
    null,
    body => disruptionFormatter(args, body),
    "There is currently a good service for the specified parameters."
  );

exports.getLines = args => sendRequest(`/Line/${args}`, null, listFormatter);

exports.getStops = args =>
  sendRequest("/StopPoint/Search", { query: args }, stopsFormatter);

exports.getStopsForSpecificMode = args =>
  sendRequest(
    "/StopPoint/Search",
    { query: args.s, modes: args.m },
    stopsFormatter
  );
