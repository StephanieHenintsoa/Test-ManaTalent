<template>
    <div class="user-entity-detail">
      <h2>🔍 Détail Association User ↔ Entity</h2>
  
      <!-- Formulaire de recherche -->
      <form @submit.prevent="fetchUserEntity">
        <label for="id">ID de l'association :</label>
        <input
          type="number"
          v-model="searchId"
          placeholder="Ex: 1"
          required
        />
        <button type="submit">Rechercher</button>
      </form>
  
      <!-- Affichage résultat -->
      <div v-if="userEntity" class="result">
        <h3>Résultat :</h3>
        <ul>
          <li><strong>ID Association :</strong> {{ userEntity.id }}</li>
          <li><strong>Utilisateur :</strong> {{ userEntity.username }} ({{ userEntity.email }})</li>
          <li><strong>Entité :</strong> {{ userEntity.name_entity }} - {{ userEntity.description }}</li>
          <li><strong>Assigné le :</strong> {{ formatDate(userEntity.assigned_at) }}</li>
        </ul>
      </div>
  
      <p v-else-if="notFound" class="error">⚠️ Association non trouvée</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UserEntityDetail",
    data() {
      return {
        searchId: "",
        userEntity: null,
        notFound: false,
      };
    },
    methods: {
      async fetchUserEntity() {
        try {
          const res = await axios.get(`http://localhost:3000/api/user-entity/${this.searchId}`);
          this.userEntity = res.data;
          this.notFound = false;
        } catch (err) {
          if (err.response && err.response.status === 404) {
            this.notFound = true;
            this.userEntity = null;
          } else {
            console.error("Erreur API:", err);
          }
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      },
    },
  };
  </script>
  
  <style scoped>
  .user-entity-detail {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background: #fafafa;
  }
  
  form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  input {
    flex: 1;
    padding: 8px;
  }
  
  button {
    padding: 8px 12px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  button:hover {
    background: #4338ca;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
  