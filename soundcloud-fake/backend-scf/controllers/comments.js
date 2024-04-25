const {comments} = require("../data");

const getComments = (req, res) => {
  res.status(200).json({ success: true, data: comments });
};

const createComment = (req, res) => {
  const { comment } =
    req.body;
  if (!comment) {
    return res
      .status(400)
      .json({ success: false, msg: "No Comment Input" });
  }
  res.status(200).json({success:true,comment: comment})
};

module.exports = {getComments,createComment}