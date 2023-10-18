import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ success: false, message: "Acesso negado!" });

  try {
    await jwt.verify(token, process.env.TOKEN);
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "O Token é invalido!" });
  }
};
