import { Router } from "express";
import UserController from "../controllers/user";
import SERVER from "../const/req";

const router = Router();

router.post(SERVER.CREATE_USER, UserController.regNewUser);
router.post(SERVER.USER_LOGIN, UserController.login);
router.patch(SERVER.EDIT_USER, UserController.editUser);
router.get(SERVER.GET_USER_INFO, UserController.getUserInfo);

export default router;