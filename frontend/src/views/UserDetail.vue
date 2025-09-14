<template>
  <div class="user-detail">
    <h2>👤 Détails de l’utilisateur</h2>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="user">
      <p><strong>ID :</strong> {{ user.id }}</p>
      <p><strong>Nom d’utilisateur :</strong> {{ user.username }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Utilisateur introuvable</p>
    </div>

    <button @click="$router.push('/users')">⬅ Retour à la liste</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserDetail",
  data() {
    return {
      user: null,
      loading: true,
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const res = await axios.get(`http://localhost:3000/api/users/${id}`);
      this.user = res.data;
    } catch (err) {
      console.error("Erreur lors du chargement de l’utilisateur:", err);
      this.user = null;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.user-detail {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>
