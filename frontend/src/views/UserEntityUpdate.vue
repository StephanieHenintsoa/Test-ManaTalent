<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Mettre à jour une relation</h2>
      <form @submit.prevent="updateRelation">
        <div class="mb-3">
          <label>User ID</label>
          <input v-model="userId" class="border p-2 w-full" />
        </div>
        <div class="mb-3">
          <label>Ancienne Entity ID</label>
          <input v-model="oldEntityId" class="border p-2 w-full" />
        </div>
        <div class="mb-3">
          <label>Nouvelle Entity ID</label>
          <input v-model="newEntityId" class="border p-2 w-full" />
        </div>
        <button type="submit" class="bg-green-500 text-white px-4 py-2">Mettre à jour</button>
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
      };
    },
    methods: {
      async updateRelation() {
        try {
          await axios.put("http://localhost:3000/api/user-entity/update", {
            userId: this.userId,
            oldEntityId: this.oldEntityId,
            newEntityId: this.newEntityId,
          });
          alert("Relation mise à jour !");
        } catch (err) {
          console.error("Erreur update :", err);
        }
      },
    },
  };
  </script>
  