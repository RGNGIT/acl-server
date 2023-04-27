import { Router } from "express";
import UserController from "../controllers/user";
import RoleController from "../controllers/role";
import SERVER from "../const/req";

const router = Router();

router.post(SERVER.CREATE_USER, UserController.regNewUser);
router.post(SERVER.USER_LOGIN, UserController.login);
router.patch(SERVER.EDIT_USER, UserController.editUser);
router.get(SERVER.GET_USER_INFO, UserController.getUserInfo);
router.get(SERVER.GET_ALL_USERS, UserController.getAllUsers);
router.get(SERVER.GET_ALL_USER_ROLES, UserController.getAllUserRoles);
router.post(SERVER.ADD_NEW_ROLE, RoleController.regNewRole);

export default router;