export class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }
}

export class UserId extends User{
  constructor(id, login, password){
    this.id = id; 
    this.login = login;
    this.password = password;
  }
}
