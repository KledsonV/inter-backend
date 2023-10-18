import { body, validationResult } from "express-validator";
import Student from "../data/models/studentModel.mjs";
import Image from "../data/models/imageModel.mjs";

const validationName = (value) => {
  if (/[^a-zA-Z0-9\s]/.test(value)) {
    throw new Error("O Nome e senha não pode conter caracteres especiais.");
  }
  if (!/[a-zA-Z]{3,}/.test(value)) {
    throw new Error("O nome deve conter pelo menos 5 letras.");
  }
  return true;
};
const validationFather = (value) => {
  if (!value) {
    return true;
  }

  if (/[^a-zA-Z0-9\s]/.test(value)) {
    throw new Error("O Nome e senha não pode conter caracteres especiais.");
  }
  if (!/[a-zA-Z]{5,}/.test(value)) {
    throw new Error("O nome deve conter pelo menos 5 letras.");
  }
  return true;
};
const validationAge = (value) => {
  if (/\s/.test(value)) {
    throw new Error("A idade não pode conter espaços em branco.");
  }
  if (/[^a-zA-Z0-9]/.test(value)) {
    throw new Error("A idade não pode conter caracteres especiais.");
  }
  return true;
};
const validationBirth = (value) => {
  const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!datePattern.test(value)) {
    throw new Error("A data deve estar no formato DD/MM/YYYY.");
  }

  return true;
};
const validationPhone = (value) => {
  const phonePattern = /^\(\d{2}\)\s\d{5}-\d{4}$/;

  if (!value) {
    return true;
  }

  if (!phonePattern.test(value)) {
    throw new Error(
      "O número de telefone deve estar no formato (00) 00000-0000."
    );
  }

  return true;
};

export class CreateStudentCase {
  constructor(studentRepository) {
    this.studentRepository = studentRepository;
  }

  async execute(req, student) {
    if (student.father == null || student.father == "") {
      student.father = "Nome não declarado!";
    }
    if (student.contact_father == null || student.contact_father == "") {
      student.contact_father = "(00) 00000-0000";
    }
    if (student.others == null || student.others == "") {
      student.others = "(00) 00000-0000";
    }

    const validationRules = [
      body("name")
        .notEmpty()
        .withMessage("O nome é obrigatório!")
        .custom(validationName),
      body("age")
        .notEmpty()
        .withMessage("A idade é obrigatória!")
        .custom(validationAge),
      body("birth")
        .notEmpty()
        .withMessage("A data de nascimento é obrigatória!")
        .custom(validationBirth),
      body("address").notEmpty().withMessage("O endereço é obrigatório!"),
      body("mother")
        .notEmpty()
        .withMessage("Nome da mãe é obrigatório!")
        .custom(validationName),
      body("father").custom(validationFather).optional(),
      body("contact_mother")
        .notEmpty()
        .withMessage("O numero da mãe é obrigatório!")
        .custom(validationPhone),
      body("contact_father").custom(validationPhone).optional(),
      body("others").custom(validationPhone).optional(),
    ];

    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { success: false, errors: errors.array() };
    }

    const studentCreate = await this.studentRepository.createStudent(
      student.name,
      student.age,
      student.birth,
      student.address,
      student.mother,
      student.father,
      student.contact_mother,
      student.contact_father,
      student.others
    );
    return {
      success: true,
      student: studentCreate,
    };
  }
}

export class GetAllStudentsCase {
  async execute() {
    const studentsWithImages = await Student.findAll({
      include: Image,
    });

    return {
      success: true,
      students: studentsWithImages,
    };
  }
}

export class CreateClassStudentCase {
  constructor(classRepository) {
    this.classRepository = classRepository;
  }

  async execute(req, classS) {
    const validationRules = [
      body("teacher")
        .notEmpty()
        .withMessage("O nome da professora é obrigatório!")
        .custom(validationName),
      body("class_name").notEmpty().withMessage("A turma é obrigatória!"),
      body("shift").notEmpty().withMessage("O turno é obrigatório!"),
    ];

    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { success: false, errors: errors.array() };
    }

    try {
      const classSuccess = await this.classRepository.addingClassStudent(
        classS
      );
    } catch (error) {
      return { success: false, error: error };
    }
  }
}

export class GetStudentByIdCase {
  constructor(studentRepository) {
    this.studentRepository = studentRepository;
  }
  async execute(studentId) {
    const student = await this.studentRepository.getStudentById(studentId);

    if (student.success) {
      return {
        student,
      };
    } else {
      return student;
    }
  }
}

export class UpdateStudentByIdCase {
  constructor(studentRepository) {
    this.studentRepository = studentRepository;
  }
  async execute(req, id, student) {
    const validationRules = [
      body("name").optional().custom(validationName),
      body("age").optional().custom(validationAge),
      body("birth").optional().custom(validationBirth),
      body("address").optional(),
      body("mother").optional().custom(validationName),
      body("father").optional().custom(validationFather),
      body("contact_mother").optional().custom(validationPhone),
      body("contact_father").optional().custom(validationPhone),
      body("others").optional().custom(validationPhone),
    ];

    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { success: false, errors: errors.array() };
    }

    const studentData = {
      name: student.name,
      age: student.age,
      birth: student.birth,
      address: student.address,
      mother: student.mother,
      father: student.father,
      contact_mother: student.contact_mother,
      contact_father: student.contact_father,
      others: student.others,
    };

    const studentUpdate = await this.studentRepository.updateStudent(
      id,
      studentData
    );
    if (studentUpdate.success) {
      return {
        success: true,
        studentUpdate,
      };
    } else {
      return studentUpdate;
    }
  }
}

export class UpdateClassByIdCase {
  constructor(classRepository) {
    this.classRepository = classRepository;
  }
  async execute(req, id, student) {
    const validationRules = [
      body("teacher").optional().custom(validationName),
      body("class_name").optional(),
      body("shift").optional(),
    ];

    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { success: false, errors: errors.array() };
    }

    const classData = {
      teacher: student.teacher,
      class_name: student.class_name,
      shift: student.shift,
    };

    const classUpdate = await this.classRepository.updateClass(id, classData);
    if (classUpdate.success) {
      return {
        success: true,
        class: classUpdate,
      };
    } else {
      return { classUpdate };
    }
  }
}

export class DeleteStudent {
  constructor(studentRepository) {
    this.studentRepository = studentRepository;
  }

  async execute(id) {
    const studentDelete = await this.studentRepository.deleteStudent(id);

    if (studentDelete.success) {
      return { success: true, studentDelete };
    } else {
      return studentDelete;
    }
  }
}

export class CreateImageStudentCase{
  constructor(imageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(imageData){
    try {
      const imageSuccess = await this.imageRepository.uploadImage(
        imageData
      );
    } catch (error) {
      return { success: false, error: error };
    }
  }
}

export class updateImageByIdCase{
  constructor(imageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(id, imageData){
    console.log(imageData, id);
    try {
      const imageSuccess = await this.imageRepository.updateImage(
        id,
        imageData
      );
    } catch (error) {
      return { success: false, error: error };
    }
  }
}