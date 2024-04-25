const {users} = require("../data");

const getUsers = (req, res) => {
  res.status(200).json({ success: true, data: users });
};

const createUser = (req, res) => {
  const { user } =
    req.body;
  if (!id || !username) {
    return res
      .status(400)
      .json({ success: false, msg: "No ID or username input" });
  }
  res.status(200).json({success:true,user:user})
};

module.exports = {getUsers,createUser}