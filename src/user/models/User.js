class User {
  constructor(dataDB){
    this.id = dataDB.id;
    this.fname = dataDB.fname;
    this.lname = dataDB.lname;
    this.login = dataDB.login;
    this.email = dataDB.email;
    this.categoryId = dataDB.categoryid;
    this.password = dataDB.password;
    this.photo = dataDB.photo;
  }
  getInfo(photoFlag = false) {
    const responseData = {
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      email: this.email,
      categoryId: this.categoryId 
    };

    if (photoFlag) {
      responseData.photo = this.photo;
    }

    return responseData;
  }
  

  getId() {
    return this.id;
  }
}
module.exports = { User }