import bcrypt from "bcrypt";

export class PasswordHashService {
  async hashPassword(password) {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  async comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    return isMatch;
  }
}
