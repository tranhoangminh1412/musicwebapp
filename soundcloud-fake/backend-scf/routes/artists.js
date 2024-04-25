const express = require("express")
const router = express.Router();

const {getArtists,createArtist} = require("../controllers/artists")

router.route("/").get(getArtists).post(createArtist);

module.exports = router