import { createRouter, createWebHistory } from "vue-router";

// Composants Users
import UserList from "../views/UserList.vue";
import UserDetail from "../views/UserDetail.vue";

// Composants Entities
import EntityList from "../views/EntityList.vue";

// Composants User-Entities
import UserEntityList from "../views/UserEntityList.vue";
import UserEntityAssign from "../views/UserEntityAssign.vue";
import UserEntityUpdate from "../views/UserEntityUpdate.vue";
import UserEntityRemove from "../views/UserEntityRemove.vue";
import UserEntityDetail from "../views/UserEntityDetail.vue";
import EntityDetail from "../views/EntityDetail.vue";


const routes = [
  // Users
  { path: "/api/users", name: "UserList", component: UserList },
  { path: "/api/users/:id", name: "UserDetail", component: UserDetail, props: true },

  // Entities
  { path: "/api/entities", name: "EntityList", component: EntityList },
  { path: "/api/entities/:id", name: "EntityDetail", component: EntityDetail, props: true },

  // { path: "/api/entities/:id", name: "EntityDetail", component: EntityDetail, props: true },

  // User-Entities
  { path: "/api/user-entities", name: "UserEntityList", component: UserEntityList },
  { path: "/api/user-entities/assign", name: "UserEntityAssign", component: UserEntityAssign },
  { path: "/api/user-entities/update", name: "UserEntityUpdate", component: UserEntityUpdate },
  { path: "/api/user-entities/remove", name: "UserEntityRemove", component: UserEntityRemove },
  // { path: "/api/user-entities/:id", name: "UserEntityDetail", component: UserEntityDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
