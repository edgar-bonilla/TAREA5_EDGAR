<template>
    <div class="login">
      <div class="login-container">
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <input v-model="email" type="email" placeholder="Ingrese su email" required />
          </div>
          <div class="input-group">
            <input v-model="password" type="password" placeholder="Ingrese su contraseña" required />
          </div>
          <div class="input-group">
            <button type="submit" class="btn-login">Iniciar sesión</button>
          </div>
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
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
    color: #333;
    margin: 0;
    padding: 0;
  }
  
  /* 🔹 Main login container */
  .login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f9;
  }
  
  /* 🔹 Login card / container */
  .login-container {
    width: 100%;
    max-width: 360px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 40px 30px;
    text-align: center;
    animation: fadeIn 0.8s ease;
  }
  

  .login-container h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  

  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group input {
    width: 100%;
    padding: 15px 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #f9f9f9;
    transition: all 0.3s ease;
  }
  
  .input-group input:focus {
    border-color: #007bff;
    background-color: #ffffff;
    outline: none;
  }
  
  /* 🔹 Button styles */
  .btn-login {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-login:hover {
    background-color: #0056b3;
  }
  
  .btn-login:active {
    background-color: #004085;
  }
  
  .btn-login:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 480px) {
    .login-container {
      width: 90%;
    }
  }
  </style>
  