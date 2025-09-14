<template>
  <div class="user-entity-list">
    <div class="header">
      <h1>Gestion des Relations User-Entity</h1>
      <button @click="showAddModal = true" class="btn btn-primary">
        <i class="fas fa-plus"></i> Nouvelle Relation
      </button>
    </div>

    <!-- Statistiques -->
    <div class="stats-cards">
      <div class="stat-card">
        <h3>{{ userEntities.length }}</h3>
        <p>Relations totales</p>
      </div>
      <div class="stat-card">
        <h3>{{ uniqueUsers.length }}</h3>
        <p>Utilisateurs assignés</p>
      </div>
      <div class="stat-card">
        <h3>{{ uniqueEntities.length }}</h3>
        <p>Entités utilisées</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="filters">
      
      <div class="filter-group">
        <select v-model="selectedUser" class="filter-select">
          <option value="">Tous les utilisateurs</option>
          <option v-for="user in uniqueUsers" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <select v-model="selectedEntity" class="filter-select">
          <option value="">Toutes les entités</option>
          <option v-for="entity in uniqueEntities" :key="entity.id" :value="entity.id">
            {{ entity.name_entity }}
          </option>
        </select>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="message.text" :class="['message', message.type]">
      {{ message.text }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Chargement...
    </div>

    <!-- Table des relations -->
    <div v-else class="table-container">
      <table class="relations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Email</th>
            <th>Entité</th>
            <th>Description</th>
            <th>Date d'assignation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="relation in filteredUserEntities" :key="relation.id">
            <td>{{ relation.id }}</td>
            <td>
              <div class="user-info">
                <i class="fas fa-user"></i>
                {{ relation.User.username }}
              </div>
            </td>
            <td>{{ relation.User.email }}</td>
            <td>
              <div class="entity-info">
                <i class="fas fa-building"></i>
                {{ relation.Entity.name_entity }}
              </div>
            </td>
            <td>
              <div class="description">
                {{ relation.Entity.description || 'Aucune description' }}
              </div>
            </td>
            <td>{{ formatDate(relation.assigned_at) }}</td>
            <td>
              <div class="actions">
                <button
                  @click="editUserEntity(relation)"
                  class="btn btn-warning btn-sm"
                  title="Modifier la relation"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteRelation(relation)"
                  class="btn btn-danger btn-sm"
                  title="Supprimer la relation"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredUserEntities.length === 0" class="no-data">
        <i class="fas fa-inbox"></i>
        <p>Aucune relation trouvée</p>
      </div>
    </div>
    <!-- Modal d'ajout de relation -->
<div v-if="showAddModal" class="modal-overlay" @click="closeModal">
  <div class="modal" @click.stop>
    <div class="modal-header">
      <h2>Nouvelle Relation User-Entity</h2>
      <button @click="closeModal" class="close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="createRelation">
        <div class="form-group">
          <label for="userId">Utilisateur</label>
          <select v-model="newRelation.userId" id="userId" required class="filter-select">
            <option value="">Sélectionnez un utilisateur</option>
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">
              {{ user.username }} ({{ user.email }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="entityId">Entité</label>
          <select v-model="newRelation.entityId" id="entityId" required class="filter-select">
            <option value="">Sélectionnez une entité</option>
            <option v-for="entity in availableEntities" :key="entity.id" :value="entity.id">
              {{ entity.name_entity }}
            </option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
            {{ submitting ? 'Création...' : 'Créer la relation' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal d'édition de relation -->
<div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
  <div class="modal" @click.stop>
    <div class="modal-header">
      <h2>Modifier Relation User-Entity</h2>
      <button @click="closeEditModal" class="close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="updateRelation">
        <div class="form-group">
          <label for="editUserId">Utilisateur</label>
          <select v-model="editRelation.userId" id="editUserId" required class="filter-select">
            <option value="">Sélectionnez un utilisateur</option>
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">
              {{ user.username }} ({{ user.email }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="editEntityId">Entité</label>
          <select v-model="editRelation.entityId" id="editEntityId" required class="filter-select">
            <option value="">Sélectionnez une entité</option>
            <option v-for="entity in availableEntities" :key="entity.id" :value="entity.id">
              {{ entity.name_entity }}
            </option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" @click="closeEditModal" class="btn btn-secondary">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
            {{ submitting ? 'Mise à jour...' : 'Mettre à jour' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'UserEntityList',
  data() {
    return {
      userEntities: [],
      availableUsers: [],
      availableEntities: [],
      loading: true,
      submitting: false,
      showAddModal: false,
      showEditModal: false,
      searchQuery: '',
      selectedUser: '',
      selectedEntity: '',
      newRelation: {
        userId: '',
        entityId: ''
      },
      editRelation: {
        id: null,
        userId: '',
        entityId: ''
      },
      message: {
        text: '',
        type: ''
      }
    };
  },
  computed: {
    filteredUserEntities() {
      return this.userEntities.filter(relation => {
        const matchesSearch = !this.searchQuery ||
          relation.User.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          relation.User.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          relation.Entity.name_entity.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesUser = !this.selectedUser || relation.id_user == this.selectedUser;
        const matchesEntity = !this.selectedEntity || relation.id_entity == this.selectedEntity;

        return matchesSearch && matchesUser && matchesEntity;
      });
    },
    uniqueUsers() {
      const users = this.userEntities.map(relation => relation.User);
      return users.filter((user, index, self) =>
        index === self.findIndex(u => u.id === user.id)
      );
    },
    uniqueEntities() {
      const entities = this.userEntities.map(relation => relation.Entity);
      return entities.filter((entity, index, self) =>
        index === self.findIndex(e => e.id === entity.id)
      );
    }
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        await Promise.all([
          this.loadUserEntities(),
          this.loadUsers(),
          this.loadEntities()
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        this.showMessage('Erreur lors du chargement des données', 'error');
      } finally {
        this.loading = false;
      }
    },

    async loadUserEntities() {
      try {
        const response = await fetch('http://localhost:3000/api/user-entities');
        const data = await response.json();

        if (data.success) {
          this.userEntities = data.data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error(`Erreur lors du chargement des relations: ${error.message}`);
      }
    },

    async loadUsers() {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();

        if (data.success) {
          this.availableUsers = data.data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    },

    async loadEntities() {
      try {
        const response = await fetch('http://localhost:3000/api/entities');
        const data = await response.json();

        if (data.success) {
          this.availableEntities = data.data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des entités:', error);
      }
    },

    async createRelation() {
      this.submitting = true;
      try {
        const response = await fetch('http://localhost:3000/api/user-entities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newRelation),
        });

        const data = await response.json();

        if (data.success) {
          this.userEntities.push(data.data);
          this.showMessage('Relation créée avec succès', 'success');
          this.closeModal();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la création de la relation:', error);
        this.showMessage(error.message, 'error');
      } finally {
        this.submitting = false;
      }
    },

    editUserEntity(relation) {
      this.editRelation = {
        id: relation.id,
        userId: relation.id_user,
        entityId: relation.id_entity
      };
      this.showEditModal = true;
    },

    async updateRelation() {
      this.submitting = true;
      try {
        const response = await fetch(`http://localhost:3000/api/user-entities/${this.editRelation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.editRelation.userId,
            entityId: this.editRelation.entityId
          }),
        });

        const data = await response.json();

        if (data.success) {
          const index = this.userEntities.findIndex(r => r.id === this.editRelation.id);
          if (index !== -1) {
            this.userEntities.splice(index, 1, data.data);
          }
          this.showMessage('Relation mise à jour avec succès', 'success');
          this.closeEditModal();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la relation:', error);
        this.showMessage(error.message, 'error');
      } finally {
        this.submitting = false;
      }
    },

    async deleteRelation(relation) {
      if (!confirm(`Êtes-vous sûr de vouloir supprimer la relation entre ${relation.User.username} et ${relation.Entity.name_entity} ?`)) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/user-entities/${relation.id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          this.userEntities = this.userEntities.filter(r => r.id !== relation.id);
          this.showMessage('Relation supprimée avec succès', 'success');
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        this.showMessage(error.message, 'error');
      }
    },

    closeModal() {
      this.showAddModal = false;
      this.newRelation = {
        userId: '',
        entityId: ''
      };
    },

    closeEditModal() {
      this.showEditModal = false;
      this.editRelation = {
        id: null,
        userId: '',
        entityId: ''
      };
    },

    showMessage(text, type) {
      this.message = { text, type };
      setTimeout(() => {
        this.message = { text: '', type: '' };
      }, 5000);
    },

    formatDate(date) {
      return new Date(date).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.user-entity-list {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  font-size: 2em;
  color: #3498db;
  margin: 0;
}

.stat-card p {
  color: #7f8c8d;
  margin: 5px 0 0 0;
}

.filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input, .filter-select, .form-control {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.message {
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.message.success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.relations-table {
  width: 100%;
  border-collapse: collapse;
}

.relations-table th,
.relations-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.relations-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.user-info, .entity-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.description {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 5px;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.no-data i {
  font-size: 48px;
  margin-bottom: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #7f8c8d;
}

.close-btn:hover {
  color: #2c3e50;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #2c3e50;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .relations-table {
    font-size: 12px;
  }
  
  .relations-table th,
  .relations-table td {
    padding: 8px 4px;
  }
}

</style>