import { DataTypes } from "sequelize";
import connection from "../Sequelize.mjs";

const Student = connection.define("student", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: "Identificador único do usuário",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Nome do aluno(a)",
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "Idade do aluno(a)",
  },
  birth: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Data de nascimento do aluno(a)",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Endereço do aluno(a)",
  },
  mother: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Nome da mãe do aluno(a)",
  },
  father: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Nome do pai do aluno(a)",
  },
  contact_mother: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_father: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  others: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

connection
  .sync({})
  .then(() => {
    console.log("INFO - Tabelas sincronizadas com sucesso");
  })
  .catch((err) => {
    console.log(err);
    console.error("ERROR - Falha na sincronização das tabelas:", err);
  });

export default Student;
