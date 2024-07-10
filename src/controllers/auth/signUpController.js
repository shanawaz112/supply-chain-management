const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({ username, password });

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .json({
        success: true,
        data: { token },
        message: "User created successfully",
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
