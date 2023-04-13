import MySQL2Commander from "../mysqlCommander";
import EncryptService from "./encrypt";

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

  }
  async fetchOneByLogin(Login) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM phys WHERE phys.Login = '${Login}';`);
    return res[0];
  }
}

export default new UserService();