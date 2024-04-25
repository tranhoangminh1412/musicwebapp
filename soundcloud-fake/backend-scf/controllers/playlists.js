const {playlists} = require("../data");

const getPlaylists = (req, res) => {
  res.status(200).json({ success: true, data: playlists });
};

const createPlaylist = (req, res) => {
  const { playlist } =
    req.body;
  if (!playlist) {
    return res
      .status(400)
      .json({ success: false, msg: "No Playlist found" });
  }
  res.status(200).json({success:true,playlist:playlist})
};

module.exports = {getPlaylists,createPlaylist}