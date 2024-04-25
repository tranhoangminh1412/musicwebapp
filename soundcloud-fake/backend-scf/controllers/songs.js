const {songs} = require("../data");

const getSongs = (req, res) => {
  res.status(200).json({ success: true, data: songs });
};

module.exports = {getSongs}