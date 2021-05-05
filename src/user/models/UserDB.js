require("dotenv").config();
const crypto = require("crypto");

const { User } = require("./User");
const db = require("../../db/db");
const { CostExplorer } = require("aws-sdk");

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(
      `SELECT * FROM "users_data" WHERE id = ${id}`
    );

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(
      `SELECT * FROM "users_data" WHERE email = '${email}'`
    );
    if (!userResponse.rowCount) {
      throw new Error("User does not exist");
    }
    return new User(userResponse.rows[0]);
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(
      `SELECT * FROM "users_data" WHERE email = '${email}'`
    );
    if (!userResponse.rowCount) {
      return {
        flag: false,
        message: `User with email: '${email}' does not exist`,
      };
    }
    const user = { ...userResponse.rows[0] };

    const passwordHash = crypto
      .pbkdf2Sync(password, "salt", 100000, 64, "sha256")
      .toString("hex");

    if (user.password !== passwordHash) {
      return { message: "Incorect password", flag: false };
    }
    return { user: new User(user), flag: true };
  }

  static async userList() {
    const userListResponse = await db.query('SELECT * FROM "users_data"');

    const users = userListResponse.rows.map((userDb) => new User(userDb));

    return users;
  }
  static async createUser(fname, lname, login, email, password) {
    const passwordHash = crypto
      .pbkdf2Sync(password, "salt", 100000, 64, "sha256")
      .toString("hex");

    const createUserResponse = await db
      .query(
        `INSERT INTO "users_data" (fname, lname, login, email, password) 
        VALUES ('${fname}', '${lname}', '${login}', '${email}', '${passwordHash}') RETURNING *`
      )
      .catch((err) => {
        if (err.constraint === "user_email") {
          const error = new Error("User with the same email already exists");
          error.status = 400;
          throw error;
        }
        throw new Error(err.message);
      });
    return new User(createUserResponse.rows[0]);
  }

  static async deleteUser(userId) {

    const user = await db.query(
      `DELETE FROM users_data WHERE id = ${userId} RETURNING *`
    );
    if (!user.id) {
      return {
        message: "User with this id does not exist"
      }
    }
    return {
      message: "DELETED",
    };
  }

  static async updateCategory(categoryid, email) {
    await db.query(`     
      UPDATE users_data
      SET categoryId = ${categoryid} 
      WHERE email = '${email}';`);

    const category = await db.query(`
      SELECT name
      FROM category
      JOIN users_data
      ON users_data.categoryId = category.id
      WHERE email = '${email}';`);
    if (!category.rowCount) {
      return { message: "Inccorect email" };
    }
    return { ...category.rows[0] };
  }

  static async updateUserPhoto(photoUrl, email) {
    await db.query(`
      UPDATE "users_data" SET photo = '${photoUrl}'
      WHERE email = '${email}'
    `);
  }
}
module.exports = {
  UserDB,
};
