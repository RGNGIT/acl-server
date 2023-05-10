import { Request, Response } from "express";
import UserService from "../services/user";
import AuthService from "../services/auth";
import EncryptService from "../services/encrypt";
import RoleService from "../services/role";

class UserController {
  async regNewUser(req: Request, res: Response): Promise<void> {
    try {
      const { surname, name, patron, login, password, userRoleKey } = req.body;
      const newUser = await UserService.addUser({
        Surname: `'${surname}'`,
        Name: `'${name}'`,
        Patron: `'${patron}'`,
        Login: `'${login}'`,
        User_Role_Key: `${userRoleKey}`
      }, password);
      res.json({ Key: newUser.insertId, token: await (new AuthService).generateToken({ Key: newUser.insertId, Login: login }) });
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
      const { id } = req.params;
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
          res.json({ key: user.Key, token: await (new AuthService).generateToken({ Key: user.Key, Login: login }) });
        } else {
          res.send("Неправильный логин/пароль");
        }
      }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.fetchOneByKey(id);
      const userRole = user?.Role_Key ? await UserService.fetchUserRoleByKey(user.User_Role_Key) : null;
      const role = await RoleService.fetchOneByPhysKey(id);
      user.Role_Key = role.Key;
      const exp = role?.Exp_Key ? await UserService.fetchExpDataByKey(role.Exp_Key) : null;
      const duty = role?.Duty_Key ? await RoleService.fetchOneDutyByKey(role.Duty_Key) : null;
      res.json({ ...user, ...userRole, ...duty, ...exp });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.fetchAll();
      for(const user of users) {
        const role = await RoleService.fetchOneByPhysKey(user.Key);
        if(role) {
          user.Role = role;
        }
      }
      res.json(users);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
  async getAllUserRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await UserService.fetchUserRoles();
      res.json(roles);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new UserController();