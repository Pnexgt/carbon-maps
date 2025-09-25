const express = require("express");
const { getRoute } = require("../controllers/routeController");
const router = express.Router();

router.post("/", getRoute);

module.exports = router;