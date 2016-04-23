const request = require("request");
const fmiBaseUrl = "http://data.fmi.fi/fmi-apikey/";
const XmlParser = require("../services/XmlParser");

function checkIfValidParams(reqbody) {
  return !(typeof reqbody.apikey === "undefined" || typeof reqbody.query === "undefined" || reqbody.apikey === null || reqbody.query === null);
}

module.exports.getXML = (req, res) => {
  console.log(req.body);
  if (checkIfValidParams(req.body)) {
    const queryUrl = fmiBaseUrl+req.body.apikey+req.body.query;
    request(queryUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        XmlParser.readTifsFromXml(body)
        .then(result => {
          // console.log(result)
          res.send({
            fmilink: queryUrl,
            tiflinks: result,
          })
        })
        .catch(err => {
          res.status(500).send({
            message: "Parsing of the XML failed",
            error: err
          })
        })
      } else {
        res.status(400).send({
          message: "Request to " + queryUrl + " failed",
          error: error,
        })
      }
    })
  } else {
    res.status(400).send({
      message: "Not valid params",
    })
  }
}
