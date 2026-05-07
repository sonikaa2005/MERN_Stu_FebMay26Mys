const jwt = require("jsonwebtoken");
const users = require("../data/users");

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    "jwtsecret",
    { expiresIn: "1h" }
  );

  req.session.user = user;

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.json({
    message: "Login successful",
    token,
  });
};

module.exports = {
  login,
};
