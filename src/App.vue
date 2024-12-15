<template>
  <div id="app">
    <HeaderPage v-if="isAuthenticated" />
    <router-view />
    <FooterPage v-if="isAuthenticated" />
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';

export default {
  components: {
    HeaderPage,
    FooterPage,
  },
  data() {
    return {
      isAuthenticated: false, 
    };
  },
  created() {
    this.checkSession();
  },
  methods: {
    checkSession() {
      const sessionId = this.getCookie('session_id');
      this.isAuthenticated = !!sessionId; 
    },
    
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  },
  watch: {

    $route() {
      this.checkSession();
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
