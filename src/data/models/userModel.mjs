import { DataTypes } from "sequelize";
import connection from "../Sequelize.mjs";

const User = connection.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: "Identificador único do usuário",
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "Login do usuário",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Senha do usuário",
  },
});

connection
  .sync({})
  .then(() => {
    console.log("INFO - Tabelas sincronizadas com sucesso");
  })
  .catch((err) => {
    console.error("ERROR - Falha na sincronização das tabelas:", err);
  });

export default User;
