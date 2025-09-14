<template>
  <div class="users-by-entity">
    <h2>📋 Utilisateurs liés à l'entité {{ entityId }}</h2>

    <table v-if="users.length">
      <thead>
        <tr>
          <th>ID User</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Assigné le</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatDate(user.UserEntity.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun utilisateur trouvé pour cette entité.</p>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="page === 1" @click="page--">Précédent</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="page++">Suivant</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserEntitiesByEntity",
  data() {
    return {
      entityId: this.$route.params.entityId,
      users: [],
      page: 1,
      perPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    paginatedUsers() {
      const start = (this.page - 1) * this.perPage;
      return this.users.slice(start, start + this.perPage);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(`http://localhost:3000/api/user-entities/entity/${this.entityId}`);
        this.users = res.data.entity.Users || [];
      } catch (err) {
        console.error("Erreur API getUsersOfEntity:", err);
      }
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
