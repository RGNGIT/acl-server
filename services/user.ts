import MySQL2Commander from "../mysqlCommander";
import EncryptService from "./encrypt";
import { formSets } from "./misc";

class UserService {
  async addUser(block: { Surname, Name, Patron, Login, User_Role_Key }, Password) {
    const res = await (new MySQL2Commander).queryExec(`
    INSERT INTO phys (${Object.keys(block).join(', ')}, Password) 
    VALUES (${Object.values(block).join(', ')}, '${EncryptService.encrypt(Password)}');
    `);
    return res;
  }
  async deleteUserByKey(Key) {
    const res = await (new MySQL2Commander).queryExec(`DELETE FROM phys WHERE phys.Key = ${Key};`);
    return res;
  }
  async fetchOneByKey(Key) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM phys WHERE phys.Key = '${Key}';`);
    return res[0];
  }
  async fetchOneByLogin(Login) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM phys WHERE phys.Login = '${Login}';`);
    return res[0];
  }
  async editOneByKey(Key, block) {
    const res = await (new MySQL2Commander).queryExec(`UPDATE phys SET ${formSets(block)} WHERE phys.Key = ${Key};`);
    return res;
  }
  async fetchAll() {
    return await (new MySQL2Commander).queryExec(`SELECT * FROM phys;`);
  }
  async fetchUserRoles() {
    return await (new MySQL2Commander).queryExec(`SELECT user_role.Key as RoleKey, Name as Role_Name, ShName as Role_ShName FROM user_role;`);
  }
  async fetchUserRoleByKey(Key) {
    return (await (new MySQL2Commander).queryExec(`SELECT Name as Role_Name, ShName as Role_ShName FROM user_role WHERE user_role.Key = ${Key};`))[0];
  }
  async fetchExpDataByKey(Key) {
    return (await (new MySQL2Commander).queryExec(`SELECT exp.Name as ExpName, exp.ShName as ExpShName FROM exp WHERE exp.Key = ${Key};`))[0];
  }
}

export default new UserService();