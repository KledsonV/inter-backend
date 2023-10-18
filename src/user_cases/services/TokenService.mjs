import jwt from "jsonwebtoken";

export class TokenService {
  async createToken(user) {
    const token = await jwt.sign(
      {
        name: user.name,
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.TOKEN
    );
    return token;
  }
}
