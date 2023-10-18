import express from "express";

import {
  ClassRepository,
  ImageRepository,
  StudentRepository,
} from "../repositories/studentRepository.mjs";
import {
  CreateClassStudentCase,
  CreateImageStudentCase,
  CreateStudentCase,
  DeleteStudent,
  GetAllStudentsCase,
  GetStudentByIdCase,
  UpdateClassByIdCase,
  UpdateStudentByIdCase,
  updateImageByIdCase,
} from "../../user_cases/studentCases.mjs";
import { verifyToken } from "../middlewares/verifyToken.mjs";
import multerFile from "../middlewares/multerFile.mjs";

const router = express.Router();

// Register Student
router.post(
  "/registrar",
  verifyToken,
  multerFile.single("file"),
  async (req, res) => {
    const {
      name,
      age,
      birth,
      address,
      mother,
      father,
      contact_mother,
      contact_father,
      others,
      teacher,
      class_name,
      shift,
    } = req.body;

    const file = req.file;

    try {
      const studentData = {
        name,
        age,
        birth,
        address,
        mother,
        father,
        contact_mother,
        contact_father,
        others,
      };

      const studentRepository = new StudentRepository();
      const createStudentUseCase = new CreateStudentCase(studentRepository);

      const result = await createStudentUseCase.execute(req, studentData);
      if (result.success) {
        const student = result.student;
        const classData = {
          teacher,
          class_name,
          shift,
          studentId: student.id,
        };

        const imageData = {
          file,
          studentId: student.id,
        };

        const classRepository = new ClassRepository();
        const createClassUseCase = new CreateClassStudentCase(classRepository);

        const imageRepository = new ImageRepository();
        const createImageUseCase = new CreateImageStudentCase(imageRepository);

        await createClassUseCase.execute(req, classData);
        await createImageUseCase.execute(imageData);

        return res.status(200).json({
          success: true,
          msg: "Estudante criado com sucesso.",
        });
      } else {
        return res.status(400).json({ success: false, error: result.errors });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Erro interno");
    }
  }
);

// Get All Students
router.get("/aluno", async (req, res) => {
  try {
    const studentRepository = new StudentRepository();
    const getAllStudents = new GetAllStudentsCase(studentRepository);

    const result = await getAllStudents.execute();
    if (result.success) {
      return res.status(200).json({
        success: true,
        Students: result.students,
        Images: result.images
      });
    } else {
      return res.status(400).json({ success: false, error: result.errors });
    }
  } catch (error) {
    return res.status(500).send("Erro interno");
  }
});

router.get("/consultar/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const studentRepository = new StudentRepository();
    const getStudent = new GetStudentByIdCase(studentRepository);

    const result = await getStudent.execute(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        Student: result.student,
      });
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro interno");
  }
});

router.put("/consultar/:id", verifyToken, multerFile.single("file"), async (req, res) => {
  const { id } = req.params;
  const {
    name,
    age,
    birth,
    address,
    mother,
    father,
    contact_mother,
    contact_father,
    others,
    teacher,
    class_name,
    shift,
  } = req.body;

  const file = req.file;

  try {
    const studentData = {
      name,
      age,
      birth,
      address,
      mother,
      father,
      contact_mother,
      contact_father,
      others,
    };

    const classData = {
      teacher,
      class_name,
      shift,
    };

    console.log(file);
    const imageData = {
      file,
    };

    const studentRepository = new StudentRepository();
    const updateStudentUseCase = new UpdateStudentByIdCase(studentRepository);

    const classRepository = new ClassRepository();
    const updateClassUseCase = new UpdateClassByIdCase(classRepository);

    const imageRepository = new ImageRepository();
    const updateImageUseCase = new updateImageByIdCase(imageRepository);

    const result = await updateStudentUseCase.execute(req, id, studentData);
    if (result.success) {
      const updateData = await updateClassUseCase.execute(req, id, classData);
      const updateImageData = await updateImageUseCase.execute(id, imageData);
      return res.status(200).json({
        success: true,
        msg: "Estudante atualizado com sucesso.",
      });
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).send("Erro interno");
  }
});

router.delete("/aluno/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const studentRepository = new StudentRepository();
    const deleteStudent = new DeleteStudent(studentRepository);

    const result = await deleteStudent.execute(id);

    if (result.success) {
      return res.status(200).json({
        success: true,
        msg: "Estudante deletado com sucesso.",
      });
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro interno");
  }
});

export default router;
