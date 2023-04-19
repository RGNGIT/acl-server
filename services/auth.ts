import jwt from 'jsonwebtoken';
require("dotenv").config();

class AuthService {
  async generateToken(user: {Key, Login}) {
    const token = await jwt.sign(user, process.env.SECRET, { expiresIn: "1d" });
    return token;
  }
  async verifyToken(token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch(err) {
      return err;
    }
  }
  checkUserPassword(cmp: {
    pass1: string;
    pass2: string;
  }): boolean {
    return cmp.pass1 === cmp.pass2;
  }
}

export default AuthService;