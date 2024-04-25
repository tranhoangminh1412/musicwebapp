const {genres} = require("../data");

const getGenres = (req, res) => {
  res.status(200).json({ success: true, data: genres });
};

const createGenre = (req, res) => {
  const { genre } =
    req.body;
  if (!genre) {
    return res
      .status(400)
      .json({ success: false, msg: "No genre input" });
  }
  res.status(200).json({success:true,genre:genre})
};

module.exports = {getGenres,createGenre}