export class Student {
  constructor(name, age, birth, address, mother, father) {
    this.name = name;
    this.age = age;
    this.birth = birth;
    this.address = address;
    this.mother = mother;
    this.father = father;
  }
}

export class Contact{
  constructor(contact_mother, contact_father, others) {
    this.contact_mother = contact_mother;
    this.contact_father = contact_father;
    this.others = others;
  }
}

export class StudentId extends Student {
  constructor(id, name, age, birth, address, mother, father) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.birth = birth;
    this.address = address;
    this.mother = mother;
    this.father = father;
  }
}
