import MySQL2Commander from "../mysqlCommander";
import EncryptService from "./encrypt";
import { formSets } from "./misc";

class UserService {
  async addUser(block: { Surname, Name, Patron, Login }, Password) {
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
}

export default new UserService();