const express = require("express");
const bookReaderRoutes = require("./bookReader.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/bookReader", bookReaderRoutes);

module.exports = router;
