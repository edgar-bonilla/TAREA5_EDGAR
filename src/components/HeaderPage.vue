<template>
  <header class="app-header d-flex justify-content-between align-items-center">
    <!-- Sección de navegación -->
    <nav>
      <router-link to="/books">Books</router-link> |
      <router-link to="/authors">Authors</router-link> |
      <router-link to="/publishers">Publishers</router-link>
    </nav>

    <!-- Botón de logout -->
    <button class="btn btn-danger btn-sm logout-button" @click="logout">Logout</button>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      
      document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // 🔹 Redirige al usuario a la página de inicio de sesión
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 1rem 0.5rem;
  font-size: 18px;
  z-index: 1000;
}

nav a, nav router-link {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  font-size: 20px;
}

nav a:hover, nav router-link:hover {
  text-decoration: underline;
}

/* Botón de logout */
.logout-button {
  margin-right: 1rem;
  font-size: 16px;
  color: #fff;
}

.logout-button:hover {
  background-color: #dc3545;
}
</style>
