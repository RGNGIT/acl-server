import UserRouter from "./users";

export default function buildRouter(router) {
  router.use(UserRouter);
}