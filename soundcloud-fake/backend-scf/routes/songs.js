const express = require("express")
const router = express.Router();

const {getSongs} = require("../controllers/songs")

router.route("/").get(getSongs);

module.exports = router