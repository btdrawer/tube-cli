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

const sendRequest = (uri, params) =>
  request(urlConstructor(uri, params), (err, res, body) => {
    if (err) console.log(err);
    console.log(JSON.parse(body));
  });

exports.getModes = () => sendRequest("/Line/Meta/Modes");
exports.getModeStatus = args => sendRequest(`/Line/Mode/${args}`);
