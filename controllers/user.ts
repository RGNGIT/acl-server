import { Request, Response } from "express";
import UserService from "../services/user";
import AuthService from "../services/auth";
import EncryptService from "../services/encrypt";

class UserController {
  async regNewUser(req: Request, res: Response): Promise<void> {
    try {
      const { surname, name, patron, login, password } = req.body;
      const newUser = await UserService.addUser({
        Surname: `'${surname}'`,
        Name: `'${name}'`,
        Patron: `'${patron}'`,
        Login: `'${login}'`
      }, password);
      res.json({ token: await (new AuthService).generateToken({ Key: newUser.insertId, Login: login }) });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.deleteUserByKey(id);
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async editUser(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params;
      const { surname, name, patron, login, password } = req.body;
      await UserService.editOneByKey(id, { Surname: surname, Name: name, Patron: patron, Login: login, Password: EncryptService.encrypt(password) });
      res.send("OK");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { login, password } = req.body;
      const user = await UserService.fetchOneByLogin(login);
      if (!user) {
        res.send("Не нашел такого");
      } else {
        const hashPassword = EncryptService.encrypt(password);
        if ((new AuthService).checkUserPassword({ pass1: user.Password, pass2: hashPassword })) {
          res.json({ token: await (new AuthService).generateToken({ Key: user.Key, Login: login }) });
        } else {
          res.send("Неправильный логин/пароль");
        }
      }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new UserController();