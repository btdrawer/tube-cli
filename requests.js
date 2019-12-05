const request = require("request");
const urlConstructor = uri =>
  `https://api.tfl.gov.uk${uri}?app_id=${process.env.app_id}&app_key=${process.env.app_key}`;
const {
  formatNames,
  statusFormatter,
  disruptionFormatter
} = require("./formatters");

const sendRequest = (uri, formatter) =>
  request(urlConstructor(uri), (err, res, body) => {
    if (err) throw err;
    else if (body.length > 0) {
      formatter(JSON.parse(body)).forEach(item => console.log(item));
    }
  });

exports.getModeDisruptions = args =>
  sendRequest(`/Line/Mode/${args}/Disruption`, body =>
    disruptionFormatter(args, body)
  );

exports.getModes = () =>
  sendRequest("/Line/Meta/Modes", body =>
    body.map(({ modeName }) => `${formatNames(modeName)} (${modeName})`)
  );

exports.getModeStatus = args =>
  sendRequest(`/Line/Mode/${args}`, statusFormatter);

exports.getLineDisruptions = args =>
  sendRequest(`/Line/${args}/Disruption`, body =>
    disruptionFormatter(args, body)
  );

exports.getLineStatuses = args => sendRequest(`/Line/${args}`, statusFormatter);
