const request = require("request");
const { urlConstructor, formatNames } = require("./helpers");

const sendRequest = (uri, formatter) =>
  request(urlConstructor(uri), (err, res, body) => {
    if (err) console.log(err);
    formatter(JSON.parse(body)).forEach(item => console.log(item));
  });

exports.getModes = () =>
  sendRequest("/Line/Meta/Modes", body =>
    body.map(({ modeName }) => `${formatNames(modeName)} (${modeName})`)
  );

exports.getModeStatus = args =>
  sendRequest(`/Line/Mode/${args}`, body =>
    body.map(({ id, name, lineStatuses, disruptions }) => ({
      name: `${name} (${id})`,
      status: lineStatuses.length > 0 ? lineStatuses : "Good service",
      disruptions: disruptions.length > 0 ? disruptions : "None"
    }))
  );
