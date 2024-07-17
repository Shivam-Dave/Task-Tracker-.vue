<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="signup" class="form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="btn signup-btn">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        await axios.post('http://localhost:3000/auth/signup-user', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        alert('Invalid Credentials');
        console.error('Signup failed', error);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 18px;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.btn:hover {
  background-color: #218838;
}

.signup-btn {
  margin-top: 20px;
}
</style>
