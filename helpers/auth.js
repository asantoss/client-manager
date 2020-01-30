const { sign } = require("jsonwebtoken");

const createTokens = user => {
  const accessToken = sign(
    {
      userId: user.id
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "15m"
    }
  );
  const refreshToken = sign(
    {
      userId: user.id
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );
  return { accessToken, refreshToken };
};

module.exports = createTokens;
