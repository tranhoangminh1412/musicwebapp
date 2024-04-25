const express = require("express")
const router = express.Router();

const {getGenres,createGenre} = require("../controllers/genres")

router.route("/").get(getGenres).post(createGenre);

module.exports = router