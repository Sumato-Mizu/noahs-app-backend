"use strict";

const express = require("express");
const router = new express.Router();

const fmiCtrl = require("./xml");

router.get("/", (req, res) => {
  res.json({
    "message": "Sup guys."
  });
});

router.get("/fmi", fmiCtrl.parseXml);
router.get("/png", fmiCtrl.parsePng);

module.exports = router;
