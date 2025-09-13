<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Assigner une entité à un utilisateur</h2>
    <form @submit.prevent="assignEntity">
      
      <!-- Sélecteur Utilisateur -->
      <div class="mb-3">
        <label class="block font-medium mb-1">Utilisateur</label>
        <select v-model="userId" class="border p-2 w-full">
          <option value="" disabled>Sélectionnez un utilisateur</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }} ({{ user.email }})
          </option>
        </select>
      </div>

      <!-- Sélecteur Entité -->
      <div class="mb-3">
        <label class="block font-medium mb-1">Entité</label>
        <select v-model="entityId" class="border p-2 w-full">
          <option value="" disabled>Sélectionnez une entité</option>
          <option v-for="entity in entities" :key="entity.id" :value="entity.id">
            {{ entity.name_entity }} - {{ entity.description }}
          </option>
        </select>
      </div>

      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        ✅ Assigner
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserEntityAssign",
  data() {
    return {
      userId: "",
      entityId: "",
      users: [],
      entities: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const [usersRes, entitiesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users"),
          axios.get("http://localhost:3000/api/entities"),
        ]);
        this.users = usersRes.data;
        this.entities = entitiesRes.data;
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      }
    },
    async assignEntity() {
      try {
        await axios.post("http://localhost:3000/api/user-entity/assign", {
          userId: this.userId,
          entityId: this.entityId,
        });
        alert("✅ Entité assignée avec succès !");
        this.userId = "";
        this.entityId = "";
      } catch (err) {
        console.error("Erreur assignation :", err);
        alert("❌ Erreur lors de l’assignation !");
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
label {
  color: #333;
}
</style>
