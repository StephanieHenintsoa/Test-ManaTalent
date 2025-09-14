import { createRouter, createWebHistory } from "vue-router";

import UserList from "../views/UserList.vue";
import UserDetail from "../views/UserDetail.vue";
import EntityList from "../views/EntityList.vue";
import UserEntityList from "../views/UserEntityList.vue";
import EntityDetail from "../views/EntityDetail.vue";

const routes = [
  { path: "/api/users", name: "UserList", component: UserList },
  { path: "/api/users/:id", name: "UserDetail", component: UserDetail, props: true },
  { path: "/api/entities", name: "EntityList", component: EntityList },
  { path: "/api/entities/:id", name: "EntityDetail", component: EntityDetail, props: true },
  { path: "/api/user-entities", name: "UserEntityList", component: UserEntityList },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
