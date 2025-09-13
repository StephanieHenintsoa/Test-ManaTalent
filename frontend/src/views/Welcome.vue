<template>
  <div class="welcome-page">
    <div class="welcome-container">
      <div class="welcome-header">
        <h1 class="welcome-title">
          Bienvenue sur <span class="brand">Owlee</span> 🦉
        </h1>
        <p class="welcome-subtitle">
          Votre plateforme de gestion éducative moderne et intuitive
        </p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3 class="stat-number">2,000</h3>
            <p class="stat-label">Étudiants</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <h3 class="stat-number">45</h3>
            <p class="stat-label">Classes</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">👨‍🏫</div>
          <div class="stat-content">
            <h3 class="stat-number">120</h3>
            <p class="stat-label">Professeurs</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📖</div>
          <div class="stat-content">
            <h3 class="stat-number">15</h3>
            <p class="stat-label">Matières</p>
          </div>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2 class="section-title">Actions rapides</h2>
        <div class="actions-grid">
          <router-link to="/students" class="action-card">
            <div class="action-icon">👥</div>
            <h3>Gérer les étudiants</h3>
            <p>Ajouter, modifier ou consulter les profils étudiants</p>
          </router-link>
          
          <router-link to="/classes" class="action-card">
            <div class="action-icon">📖</div>
            <h3>Gérer les classes</h3>
            <p>Organiser et administrer vos classes</p>
          </router-link>
          
          <router-link to="/assignments" class="action-card">
            <div class="action-icon">📝</div>
            <h3>Créer un devoir</h3>
            <p>Assigner de nouveaux devoirs à vos étudiants</p>
          </router-link>
          
          <router-link to="/library" class="action-card">
            <div class="action-icon">📚</div>
            <h3>Bibliothèque</h3>
            <p>Accéder aux ressources pédagogiques</p>
          </router-link>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2 class="section-title">Activité récente</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">✅</div>
            <div class="activity-content">
              <p class="activity-text">15 nouveaux étudiants ajoutés à la classe de Mathématiques</p>
              <p class="activity-time">Il y a 2 heures</p>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">📝</div>
            <div class="activity-content">
              <p class="activity-text">Devoir de Physique créé pour la classe de Terminale S</p>
              <p class="activity-time">Il y a 5 heures</p>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">📊</div>
            <div class="activity-content">
              <p class="activity-text">Rapport mensuel généré avec succès</p>
              <p class="activity-time">Hier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style scoped src="../css/welcome.css"></style>