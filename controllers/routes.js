"use strict";

const express = require("express");
const router = new express.Router();

const fmiCtrl = require("./xml");
const radarCtrl = require("./radar")

router.get("/", (req, res) => {
  res.json({
    "message": "Sup guys."
  });
});

router.get("/xml", fmiCtrl.parseXml);
router.get("/png", fmiCtrl.parsePng);
router.post("/radar", radarCtrl.getXML);


module.exports = router;
