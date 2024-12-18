<template>
  <header class="navbar navbar-dark bg-dark fixed-top d-flex justify-content-between px-3">
    <nav class="navbar-nav d-flex flex-row">
      <router-link to="/books" class="nav-link text-white px-3">Books</router-link>
      <router-link to="/authors" class="nav-link text-white px-3">Authors</router-link>
      <router-link to="/publishers" class="nav-link text-white px-3">Publishers</router-link>
    </nav>
    <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

.nav-link:hover {
  text-decoration: underline;
}
</style>
