const request = require("request");
const fmiBaseUrl = "http://data.fmi.fi/fmi-apikey/";
const XmlParser = require("../services/XmlParser");

module.exports.getXML = (req, res) => {
  if (typeof req.body.apikey !== "undefined" && typeof req.body.query !== "undefined") {
    const queryUrl = fmiBaseUrl+req.body.apikey+req.body.query;
    request(queryUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const tiflinks;
        XmlParser.readXml(body)
        .then(result => {
          console.log(result)
          res.send({
            tiflinks: result,
          })
        })
        .catch(err => {
          res.send({
            message: "xml parser failed",
            error: err
          })
        })
      } else {
        res.send({
          message: "request to " + queryUrl + " failed",
          error: error,
        })
      }
    })
  } else {
    res.send({
      message: "No apikey or query in request params",
    })
  }
}
