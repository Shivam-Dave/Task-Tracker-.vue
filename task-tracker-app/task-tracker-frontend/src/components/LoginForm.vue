<!-- src/components/LoginForm.vue -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <p>Don't have an account? <router-link to="/signup">Signup</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          'http://localhost:3000/auth/login-user',
          {
            username: this.username,
            password: this.password,
          },
        );
        localStorage.setItem('token', response.data.token);
        this.$router.push('/tasks');
      } catch (error) {
        this.errorMessage = 'Invalid Credentials';
      }
    },
  },
};
</script>

<style scoped>
p {
  text-align: center;
  margin-top: 1rem;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
