"use strict";

const express = require("express");
const router = new express.Router();

const fmiCtrl = require("./xml");
const radar = require("./radar")

router.get("/", (req, res) => {
  res.json({
    "message": "Sup guys."
  });
});

router.get("/xml", fmiCtrl.parseXml);
router.get("/png", fmiCtrl.parsePng);
router.post("/radar", radar.getXML);


module.exports = router;
