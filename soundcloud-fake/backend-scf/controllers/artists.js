const {artists} = require("../data");

const getArtists = (req, res) => {
  res.status(200).json({ success: true, data: artists });
};

const createArtist = (req, res) => {
  const { artist } =
    req.body;
  if (!id || !username) {
    return res
      .status(400)
      .json({ success: false, msg: "No artist input" });
  }
  res.status(200).json({success:true,artist:artist})
};

module.exports = {getArtists,createArtist}