<template>
  <div class="user-entities-by-user">
    <h2>📋 Entités liées à l'utilisateur {{ userId }}</h2>

    <table v-if="associations.length">
      <thead>
        <tr>
          <th>ID Entity</th>
          <th>Nom Entité</th>
          <th>Description</th>
          <th>Assigné le</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in paginatedAssociations" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.name_entity }}</td>
          <td>{{ entity.description }}</td>
          <td>{{ formatDate(entity.UserEntity.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucune entité trouvée pour cet utilisateur.</p>

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
  name: "UserEntitiesByUser",
  data() {
    return {
      userId: this.$route.params.userId,
      associations: [],
      page: 1,
      perPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.associations.length / this.perPage);
    },
    paginatedAssociations() {
      const start = (this.page - 1) * this.perPage;
      return this.associations.slice(start, start + this.perPage);
    },
  },
  methods: {
    async fetchAssociations() {
      try {
        const res = await axios.get(`http://localhost:3000/api/user-entities/user/${this.userId}`);
        this.associations = res.data.user.Entities || [];
      } catch (err) {
        console.error("Erreur API getEntitiesOfUser:", err);
      }
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  mounted() {
    this.fetchAssociations();
  },
};
</script>
