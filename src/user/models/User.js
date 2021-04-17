class User {
  constructor(dataDB){
    this.id = dataDB.id;
    this.fname = dataDB.fname;
    this.lname = dataDB.lname;
    this.login = dataDB.login;
    this.email = dataDB.email;
    this.categoryId = dataDB.categoryId;
    this.password = dataDB.password;
  }
  getInfo(idFlag = false) {
    const responseData = {
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      email: this.email,
    };

    if (idFlag) {
      responseData.id = this.id;
    }

    return responseData;
  }

  getId() {
    return this.id;
  }
}
module.exports = { User }