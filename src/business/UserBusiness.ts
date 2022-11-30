import { UserInputDTO, LoginInputDTO, User, UserRole, CreateUser } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError, InvalidEmail, InvalidName } from "../error/BaseError";

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();
const authenticator = new Authenticator();

export class UserBusiness {
  async createUser(input: UserInputDTO) {
    try {
      const { name, email, password, role } = input;
      if (!name || !email || !password || !role) {
        throw new BaseError(
          400,
          'Preencha os campos "name", "email", "password" e "role'
        );
      }

      if (name.length < 3) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }
// #SOCORRO PEU
      if (role != UserRole.ADMIN || UserRole.NORMAL){}

      const id: string = idGenerator.generateId();

      const hashPassword: string = await hashManager.hash(input.password);

      const user: CreateUser = {
        id,
        name,
        email,
        password: hashPassword,
        role,
      };
      
      await userDatabase.createUser(user);

      const accessToken = authenticator.generateToken({ id, role});
      return accessToken;
    } catch (error) {}
  }

  async getUserByEmail(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.getUserByEmail(user.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
