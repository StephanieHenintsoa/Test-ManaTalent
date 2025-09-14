<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Mettre à jour une relation</h2>
    <form @submit.prevent="updateRelation">
      
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

      <!-- Ancienne Entité -->
      <div class="mb-3">
        <label class="block font-medium mb-1">Ancienne entité</label>
        <select v-model="oldEntityId" class="border p-2 w-full">
          <option value="" disabled>Sélectionnez l’ancienne entité</option>
          <option v-for="entity in entities" :key="entity.id" :value="entity.id">
            {{ entity.name_entity }} - {{ entity.description }}
          </option>
        </select>
      </div>

      <!-- Nouvelle Entité -->
      <div class="mb-3">
        <label class="block font-medium mb-1">Nouvelle entité</label>
        <select v-model="newEntityId" class="border p-2 w-full">
          <option value="" disabled>Sélectionnez la nouvelle entité</option>
          <option v-for="entity in entities" :key="entity.id" :value="entity.id">
            {{ entity.name_entity }} - {{ entity.description }}
          </option>
        </select>
      </div>

      <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        ✅ Mettre à jour
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserEntityUpdate",
  data() {
    return {
      userId: "",
      oldEntityId: "",
      newEntityId: "",
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
    async updateRelation() {
      try {
        await axios.put("http://localhost:3000/api/user-entities/update", {
          userId: this.userId,
          oldEntityId: this.oldEntityId,
          newEntityId: this.newEntityId,
        });
        alert("✅ Relation mise à jour !");
        this.userId = "";
        this.oldEntityId = "";
        this.newEntityId = "";
      } catch (err) {
        console.error("Erreur update :", err);
        alert("❌ Erreur lors de la mise à jour !");
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
