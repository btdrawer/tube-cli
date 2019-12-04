const request = require("request");
const urlConstructor = uri =>
  `https://api.tfl.gov.uk${uri}?app_id=${process.env.app_id}&app_key=${process.env.app_key}`;

const sendRequest = (uri, formatter) =>
  request(urlConstructor(uri), (err, res, body) => {
    if (err) console.log(err);
    console.log(formatter(JSON.parse(body)));
  });

exports.getModes = () =>
  sendRequest("/Line/Meta/Modes", body => body.map(({ modeName }) => modeName));

exports.getModeStatus = args =>
  sendRequest(`/Line/Mode/${args}`, body =>
    body.map(line => ({
      name: line.name,
      status: line.lineStatuses,
      disruptions: line.disruptions
    }))
  );
