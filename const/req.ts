export default {
  /// Юзвери
  CREATE_USER: "/createUser",
  EDIT_USER: "/editUser/:id",
  DELETE_USER: "/deleteUser/:id",
  USER_LOGIN: "/login",
  GET_USER_INFO: "/getUserInfo/:id",
  GET_ALL_USERS: "/getAllUsers",
  GET_ALL_USER_ROLES: "/getAllUserRoles",
  ADD_NEW_ROLE: "/addRole",
  // Словари
  ADD_DICTIONARY: "/addDictionary/:table",
  GET_DICTIONARY: "/getDictionary/:table",
  EDIT_DICTIONARY: "/editDictionary/:table/:id",
  DELETE_DICTIONARY: "/deleteDictionary/:table/:id",
  // Таски
  ADD_TASK: "/addTask",
  CONNECT_ROLE_TASK: "/connectRoleTask",
  GET_USER_TASKS: "/getUserTasks/:id",
  GET_NODE_TASKS: "/getNodeTasks/:id",
  CONNECT_USER_NODE: "/connectUserNode",
  GET_USER_NODES: "/getUserNodes/:id",
  EDIT_TASK: "/editTask/:id",
}