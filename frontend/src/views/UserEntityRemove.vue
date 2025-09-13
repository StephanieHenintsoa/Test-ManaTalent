<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Supprimer une relation</h2>
      <form @submit.prevent="removeRelation">
        <div class="mb-3">
          <label>User ID</label>
          <input v-model="userId" class="border p-2 w-full" />
        </div>
        <div class="mb-3">
          <label>Entity ID</label>
          <input v-model="entityId" class="border p-2 w-full" />
        </div>
        <button type="submit" class="bg-red-500 text-white px-4 py-2">Supprimer</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UserEntityRemove",
    data() {
      return {
        userId: "",
        entityId: "",
      };
    },
    methods: {
      async removeRelation() {
        try {
          await axios.delete("http://localhost:3000/api/user-entity/remove", {
            data: {
              userId: this.userId,
              entityId: this.entityId,
            },
          });
          alert("Relation supprimée !");
        } catch (err) {
          console.error("Erreur suppression :", err);
        }
      },
    },
  };
  </script>
  