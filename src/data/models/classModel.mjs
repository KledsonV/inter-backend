import { DataTypes } from "sequelize";
import connection from "../Sequelize.mjs";
import Student from "./studentModel.mjs";

const Class = connection.define("class", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: "Identificador único",
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "Identificador único do aluno",
  },
  teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Student.hasOne(Class, { foreignKey: 'studentId' });
Class.belongsTo(Student, { foreignKey: 'studentId' });

connection
  .sync({})
  .then(() => {
    console.log("INFO - Tabelas sincronizadas com sucesso");
  })
  .catch((err) => {
    console.log(err);
    console.error("ERROR - Falha na sincronização das tabelas:", err);
  });

export default Class;
