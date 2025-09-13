<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">📚</div>
        <h2>ManaTalent</h2>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 class="nav-section-title">Project</h3>
        <ul class="nav-list">
          <!-- Entity -->
          <li class="nav-item">
            <router-link to="/api/entities" class="nav-link" exact-active-class="active">
              <span class="nav-icon">🏠</span>
              <span>Entity</span>
            </router-link>
          </li>

          <!-- Users -->
          <li class="nav-item">
            <router-link to="/api/users" class="nav-link" active-class="active">
              <span class="nav-icon">👥</span>
              <span>User</span>
            </router-link>
          </li>

          <!-- User ↔ Entity -->
          <li class="nav-item">
            <span class="nav-link">
              <span class="nav-icon">🔗</span>
              <span>User ↔ Entity</span>
            </span>
            <ul class="sub-nav-list">
              <li>
                <router-link to="/api/user-entities" class="nav-link" active-class="active">
                  📋 Liste
                </router-link>
              </li>
              <li>
                <router-link to="/api/user-entities/assign" class="nav-link" active-class="active">
                  ➕ Assigner
                </router-link>
              </li>
              <li>
                <router-link to="/api/user-entities/update" class="nav-link" active-class="active">
                  ✏️ Mettre à jour
                </router-link>
              </li>
              <li>
                <router-link to="/api/user-entities/remove" class="nav-link" active-class="active">
                  ❌ Supprimer
                </router-link>
              </li>
            </ul>
          </li>

          

        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped src="../css/sidebar.css"></style>
