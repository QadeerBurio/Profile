import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
