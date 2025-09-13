<template>
  <div class="user-entity-list">
    <h2>📋 Liste des associations User ↔ Entity</h2>

    <table>
      <thead>
        <tr>
          <th>ID User</th>
          <th>ID Entity</th>
          <th>Utilisateur</th>
          <th>Email</th>
          <th>Entité</th>
          <th>Description</th>
          <th>Assigné le</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ue in paginatedEntities" :key="`${ue.id_user}-${ue.id_entity}`">
          <td>{{ ue.id_user }}</td>
          <td>{{ ue.id_entity }}</td>
          <td>{{ ue.User.username }}</td>
          <td>{{ ue.User.email }}</td>
          <td>{{ ue.Entity.name_entity }}</td>
          <td>{{ ue.Entity.description }}</td>
          <td>{{ formatDate(ue.assigned_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button :disabled="page === 1" @click="page--">⬅ Précédent</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="page++">Suivant ➡</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserEntityList",
  data() {
    return {
      entities: [],
      page: 1,
      perPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.entities.length / this.perPage);
    },
    paginatedEntities() {
      const start = (this.page - 1) * this.perPage;
      return this.entities.slice(start, start + this.perPage);
    },
  },
  methods: {
    async fetchEntities() {
      try {
        const res = await axios.get("http://localhost:3000/api/user-entity/all");
        // On prend la propriété associations
        this.entities = res.data.associations;
      } catch (err) {
        console.error("Erreur API:", err);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  mounted() {
    this.fetchEntities();
  },
};
</script>


<style scoped>
.user-entity-list {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f3f4f6;
}

button {
  padding: 6px 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #4338ca;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
</style>
