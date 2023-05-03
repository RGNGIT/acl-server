import ToSkip from "../const/skip-url";
import AuthService from "../services/auth";

export default async function (req, res, next) {
  try {
    if (!ToSkip.includes(req.originalUrl)) {
      const decryptedToken = await (new AuthService).verifyToken(req.headers.authorization);
      if (decryptedToken) {
        res.locals.auth = decryptedToken;
        next();
      } else {
        res.send("Какое-то дерьмо с авторизацией");
      }
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}