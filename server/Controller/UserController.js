const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../Models/UserModel");

const getInfor = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    return res.status(200).send(user);
  } catch (error) {
    // log error
  }
};

const updateInfor = async (req, res) => {
  try {
    // update user
    const userId = req.params.userId;
    const { username, email, password, new_password } = req.body;

    const user = await userModel.findById(userId);
    const isOldPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isOldPasswordValid) {
      return res.status(400).send("Mật khẩu cũ không đúng");
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        username: username,
        email: email,
        password: bcrypt.hashSync(new_password, 10), // Cập nhật mật khẩu mới
      },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).send("Cập nhật thành công");
    } else {
      return res.status(500).send("Cập nhật không thành công");
    }
  } catch (error) {
    // log error
    console.error(error);
    return res.status(500).send("Cập nhật không thành công");
  }
};

module.exports = {
  getInfor: getInfor,
  updateInfor: updateInfor,
};
