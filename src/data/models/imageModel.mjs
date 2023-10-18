import { DataTypes } from "sequelize";
import connection from "../Sequelize.mjs";
import Student from "./studentModel.mjs";

const Image = connection.define("images", {
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
  imageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageDir: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Student.hasOne(Image, { foreignKey: "studentId" });
Image.belongsTo(Student, { foreignKey: "studentId" });

connection
  .sync({})
  .then(() => {
    console.log("INFO - Tabelas sincronizadas com sucesso");
  })
  .catch((err) => {
    console.log(err);
    console.error("ERROR - Falha na sincronização das tabelas:", err);
  });

export default Image;
