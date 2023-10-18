import User from "../../data/models/userModel.mjs";

export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async createUser(login, password) {
    try {
      const user = new User({ login, password });
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByLogin(login) {
    try {
      const user = User.findOne({ where: { login: login } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
