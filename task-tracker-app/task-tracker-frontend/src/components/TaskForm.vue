<template>
  <div class="task-form-container">
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <div>
        <label for="taskTitle">Title</label>
        <input type="text" v-model="taskTitle" required />
      </div>
      <div>
        <label for="taskDescription">Description</label>
        <textarea v-model="taskDescription" required></textarea>
      </div>
      <button type="submit">+ Add Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
    };
  },
  methods: {
    async addTask() {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:3000/tasks/create',
          {
            title: this.taskTitle,
            description: this.taskDescription,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        this.$router.push('/tasks');
      } catch (error) {
        console.error('Failed to add task', error);
      }
    },
  },
};
</script>

<style scoped>
.task-form-container {
  width: 350px;
  height: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
  margin-top: 20px;
}

h2 {
  text-align: center;
  color: #333;
}

form {
  margin-top: 20px;
}

form div {
  margin-bottom: 1rem;
}

form label {
  display: block;
  margin-bottom: 0.5rem;
}

form input,
form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%; /* Full width button */
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
