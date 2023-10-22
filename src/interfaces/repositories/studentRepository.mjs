import Student from "../../data/models/studentModel.mjs";
import Class from "../../data/models/classModel.mjs";
import Image from "../../data/models/imageModel.mjs";
import { Op } from "sequelize";

export class StudentRepository {
  constructor(db) {
    this.db = db;
  }

  async createStudent(
    name,
    age,
    birth,
    address,
    mother,
    father,
    contact_mother,
    contact_father,
    others
  ) {
    try {
      const student = await Student.create({
        name: name,
        age: age,
        birth: birth,
        address: address,
        mother: mother,
        father: father,
        contact_mother: contact_mother,
        contact_father: contact_father,
        others: others,
      });
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(studentId) {
    const studentData = await Student.findOne({
      where: { id: studentId },
      include: [Class,
      Image],
    });
    if (!studentData) {
      return { success: false, error: "Aluno não encontrado!" };
    }

    try {
      const result = { studentData };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(studentId, updatedStudentData) {
    const studentVerifield = await Student.findOne({
      where: { id: studentId },
    });
    if (!studentVerifield) {
      return { success: false, errors: "Aluno não encontrado." };
    }

    const updateStudent = await Student.update(updatedStudentData, {
      where: { id: studentId },
    });

    try {
      return { success: true, msg: "Estudante atualizado com sucesso." };
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    const studentVerifield = await Student.findOne({
      where: { id: id },
    });
    if (!studentVerifield) {
      return { success: false, errors: "Aluno não encontrado." };
    }

    const resultDelete = await Student.destroy({ where: { id } });

    try {
      return resultDelete;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByName(name){
    const studentData = await Student.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      include: [Class,
      Image],
    });
    if (!studentData) {
      return { success: false, error: "Aluno não encontrado!" };
    }

    try {
      const result = studentData;
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export class ClassRepository {
  constructor(db) {
    this.db = db;
  }

  async addingClassStudent(classData) {
    try {
      const classSuccess = await Class.create({
        teacher: classData.teacher,
        class_name: classData.class_name,
        shift: classData.shift,
        studentId: classData.studentId,
      });
      return classSuccess;
    } catch (error) {
      throw error;
    }
  }

  async updateClass(studentId, updatedClassData) {
    const studentVerifield = await Student.findOne({
      where: { id: studentId },
    });
    if (!studentVerifield) {
      return { success: false, error: "Aluno não encontrado." };
    }

    const updateStudent = await Class.update(updatedClassData, {
      where: { studentId: studentId },
    });

    try {
      return updateStudent;
    } catch (error) {
      throw error;
    }
  }
}

export class ImageRepository {
  constructor(db) {
    this.db = db;
  }

  async uploadImage(imageData) {
    try {
      const imageSuccess = await Image.create({
        imageName: imageData.file.filename,
        imageDir: imageData.file.path,
        studentId: imageData.studentId,
      });
      return imageSuccess;
    } catch (error) {
      throw error;
    }
  }

  async updateImage(studentId, imageData) {
    const studentVerifield = await Student.findOne({
      where: { id: studentId },
    });
    if (!studentVerifield) {
      return { success: false, error: "Aluno não encontrado." };
    }

    const newImageData = {
      imageName: imageData.file.filename,
      imageDir: imageData.file.path,
    };

    try {
      const imageSuccess = await Image.update(newImageData, {
        where: { studentId: studentId },
      });
      return imageSuccess;
    } catch (error) {}
  }
}
