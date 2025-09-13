import { createRouter, createWebHistory } from "vue-router";

// Composants Users
import UserList from "../views/UserList.vue";

// Composants User-Entities
import UserEntityList from "../views/UserEntityList.vue";
import UserEntityAssign from "../views/UserEntityAssign.vue";
import UserEntityUpdate from "../views/UserEntityUpdate.vue";
import UserEntityRemove from "../views/UserEntityRemove.vue";
import UserEntityDetail from "../views/UserEntityDetail.vue";

const routes = [
  // Users
  { path: "/api/users", component: UserList },

  // User-Entities
  { path: "/api/user-entities/", component: UserEntityList },          // 📋 Liste toutes les relations
  { path: "/api/user-entities/assign", component: UserEntityAssign }, // ➕ Assigner une entité
  { path: "/api/user-entities/update", component: UserEntityUpdate }, // ✏️ Mettre à jour une relation
  { path: "/api/user-entities/remove", component: UserEntityRemove }, // ❌ Supprimer une relation
  { path: "/api/user-entities/:id", component: UserEntityDetail, props: true },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
