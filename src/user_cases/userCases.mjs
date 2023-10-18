import { PasswordHashService } from "./services/PasswordHashService.mjs";
import { TokenService } from "./services/TokenService.mjs";
import { body, validationResult } from "express-validator";

const validationLogin = (value) => {
  if (/[^a-zA-Z0-9]/.test(value)) {
    throw new Error("O login e senha não pode conter caracteres especiais.");
  }
  if (/\s/.test(value)) {
    throw new Error("O login e senha não pode conter espaços em branco.");
  }
  return true;
};
const validationPassword = (value) => {
  if (/\s/.test(value)) {
    throw new Error("O login e senha não pode conter espaços em branco.");
  }
  return true;
};

export class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.passwordHashService = new PasswordHashService();
  }

  async execute(req, user) {
    const existingUser = await this.userRepository.findUserByLogin(user.login);
    if (existingUser) {
      return { success: false, error: "Usuário com o mesmo login já existe." };
    }

    const validationRules = [
      body("login")
        .notEmpty()
        .withMessage("O login é obrigatório!")
        .custom(validationLogin),
      body("password")
        .notEmpty()
        .withMessage("A senha é obrigatória!")
        .custom(validationPassword),
    ];

    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { success: false, errors: errors.array() };
    }

    const hashedPassword = await this.passwordHashService.hashPassword(
      user.password
    );
    const userCreate = await this.userRepository.createUser(
      user.login,
      hashedPassword
    );
    const tokenService = new TokenService();
    const token = await tokenService.createToken(userCreate);
    return { success: true, user: userCreate, token: token };
  }
}

export class LoginUserCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.passwordHashService = new PasswordHashService();
  }

  async execute(req, user) {
    const existingUser = await this.userRepository.findUserByLogin(user.login);
    if (!existingUser) {
      return { success: false, error: "Usuário não encontrado." };
    }

    const validationRules = [
      body("login")
        .notEmpty()
        .withMessage("O login é obrigatório!")
        .custom(validationLogin),
      body("password")
        .notEmpty()
        .withMessage("A senha é obrigatória!")
        .custom(validationPassword),
    ];

    // Run validations
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    // Check for validation errorsLL
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { success: false, errors: errors.array() }
    }

    const passwordHashUser = await existingUser.dataValues.password;
    const loginAndPasswordVerifield =
      await this.passwordHashService.comparePassword(
        user.password,
        passwordHashUser
      );

    if (!loginAndPasswordVerifield) {
      return { success: false, error: "Senha incorreta." };
    }

    const tokenService = new TokenService();
    const token = await tokenService.createToken(user);
    return { success: true, token: token };
  }
}
