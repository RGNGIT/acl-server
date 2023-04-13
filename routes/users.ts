import { Router } from "express";
import UserController from "../controllers/user";
import SERVER from "../const/req";

const router = Router();

router.post(SERVER.CREATE_USER, UserController.regNewUser);
router.post(SERVER.USER_LOGIN, UserController.login);
router.patch(SERVER.EDIT_USER, UserController.editUser);

export default router;