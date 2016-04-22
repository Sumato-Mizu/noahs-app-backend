"use strict";

const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.json({
    "message": "Sup guys."
  });
});

module.exports = router;
