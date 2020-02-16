const axios = require("axios");
const {
  listFormatter,
  disruptionFormatter,
  modesFormatter,
  getStopsFormatter,
  searchStopsFormatter
} = require("./formatters");

const urlConstructor = (uri, params) => {
  let url = `https://api.tfl.gov.uk${uri}?app_id=${process.env.app_id}&app_key=${process.env.app_key}`;
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key]) url += `&${key}=${params[key]}`;
    });
  }
  return url;
};

const sendRequest = (uri, params, formatter, isEmptyString) =>
  axios
    .get(urlConstructor(uri, params))
    .then(({ data }) => formatter(data).forEach(item => console.log(item)))
    .catch(() => console.log(isEmptyString));

exports.getModeDisruptions = args =>
  sendRequest(
    `/Line/Mode/${args}/Disruption`,
    null,
    body => disruptionFormatter(args, body),
    disruptionEmptyString
  );

exports.getModes = () => sendRequest("/Line/Meta/Modes", null, modesFormatter);

exports.getModeLines = args =>
  sendRequest(`/Line/Mode/${args}`, null, listFormatter);

exports.getLineDisruptions = args =>
  sendRequest(
    `/Line/${args}/Disruption`,
    null,
    body => disruptionFormatter(args, body),
    disruptionEmptyString
  );

exports.getLines = args => sendRequest(`/Line/${args}`, null, listFormatter);

exports.getStops = args =>
  sendRequest(`/StopPoint/${args.s}`, null, getStopsFormatter);

exports.searchStops = args =>
  sendRequest(
    "/StopPoint/Search",
    { query: args.q, modes: args.m },
    searchStopsFormatter
  );

const disruptionEmptyString =
  "There is currently a good service for the specified parameters.";
