import express from "express";
import { UserRepository } from "../repositories/userRepository.mjs";
import {
  CreateUserUseCase,
  LoginUserCase,
} from "../../user_cases/userCases.mjs";
import { User } from "../../entities/UserEntitie.mjs";
import { verifyToken } from "../middlewares/verifyToken.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = new User(login, password);
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const result = await createUserUseCase.execute(req, user);

    if (result.success) {
      return res
        .status(200)
        .send(
          "Usuário criado com sucesso!" +
            "  Token de acesso: " +
            result.token
        );
    } else {
      return res.status(400).send(result.errors);
    }
  } catch (error) {
    return res.status(500).send("Erro interno");
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = new User(login, password);
    const userRepository = new UserRepository();
    const loginUserCase = new LoginUserCase(userRepository);
    const result = await loginUserCase.execute(req, user);

    return res.status(200).json({
      success: true,
      token: result.token,
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Erro Interno" });
  }
});

router.get("/verify-token", verifyToken, async (req, res) => {
  return res.status(200).json({ success: true, message: "Token valido." });
});

export default router;
