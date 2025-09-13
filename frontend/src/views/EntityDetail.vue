<template>
    <div class="entity-detail">
      <h2>👤 Détails de l'entité</h2>
  
      <div v-if="loading">Chargement...</div>
      <div v-else-if="entity">
        <p><strong>ID :</strong> {{ entity.id }}</p>
        <p><strong>Nom de l'entité :</strong> {{ entity.name_entity }}</p>
        <p><strong>Decription :</strong> {{ entity.description }}</p>
      </div>
      <div v-else>
        <p>Entité introuvable</p>
      </div>
  
      <button @click="$router.push('/api/entities')">⬅ Retour à la liste</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "EntityDetail",
    data() {
      return {
        entity: null,
        loading: true,
      };
    },
    async mounted() {
      try {
        const id = this.$route.params.id;
        const res = await axios.get(`http://localhost:3000/api/entities/${id}`);
        this.entity = res.data;
      } catch (err) {
        console.error("Erreur lors du chargement de l’utilisateur:", err);
        this.entity = null;
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  
  <style scoped>
  .entity-detail {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  </style>
  