import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
     httpOnly: true,
  expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  sameSite: "None", // Important!
  secure: true,     // Important for HTTPS
      
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
