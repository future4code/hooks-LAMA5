import { BaseDatabase } from "./BaseDatabase";
import { CreateUser, User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "USUARIOS";

  public async createUser(
 user: CreateUser
  ): Promise<void> {
    try {
      await BaseDatabase.connection()
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await BaseDatabase.connection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

}
