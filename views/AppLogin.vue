<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 360px;">
      <h2 class="text-center mb-4">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Ingrese su email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'admin@example.com',
      password: '12345',
    };
  },
  created() {
    const sessionId = this.getCookie('session_id');
    if (sessionId) {
      this.$router.push('/');
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('/.netlify/functions/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        if (response.ok) {
          this.$router.push('/');
        } else {
          const data = await response.json();
          alert(data.message || 'Error de autenticación');
        }
      } catch (error) {
        alert('Error al iniciar sesión');
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  },
};
</script>

<style scoped>
/* Se eliminó casi todo el CSS personalizado */

body {
  font-family: 'Arial', sans-serif;
}

.min-vh-100 {
  min-height: 100vh;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.card {
  border-radius: 10px;
}

.card h2 {
  font-size: 24px;
}

.btn-primary {
  font-size: 16px;
  font-weight: bold;
}
</style>
