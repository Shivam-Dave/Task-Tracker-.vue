<template>
  <div class="task-list-container">
    <h1>My Tasks :</h1>
    <div class="task-list">
      <ul>
        <li v-for="task in incompleteTasks" :key="task.id" class="task-item">
          <input
            type="checkbox"
            v-model="task.completed"
            @change="updateTaskStatus(task)"
            class="task-checkbox"
          />
          <div>
            <span class="task-title">{{ task.title }}</span>
            <br />
            <span v-if="task.description" class="task-description">{{
              task.description
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <h2>Completed Tasks :</h2>
    <div class="completed-task-list">
      <ul>
        <li
          v-for="task in completedTasks"
          :key="task.id"
          class="completed-task-item"
        >
          <span class="completed-task-title">{{ task.title }}</span>
        </li>
      </ul>
    </div>
    <div class="button-container">
      <button @click="logout" class="logout-btn">Log out</button>
      <router-link to="/add-task" class="add-task-btn">+ Add Task</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    incompleteTasks() {
      return this.tasks.filter((task) => !task.completed);
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.tasks = response.data.tasks;
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  },
  methods: {
    async updateTaskStatus(task) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `http://localhost:3000/tasks/${task.id}`,
          { completed: task.completed },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        // Remove task from tasks list if completed
        if (task.completed) {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
        }
      } catch (error) {
        console.error('Failed to update task status', error);
      }
    },
    async logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.task-list-container {
  width: 550px;
  height: 550px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow-y: auto; /* Enable vertical scroll */
}

h1,
h2 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
}

.task-list,
.completed-task-list {
  margin-top: 20px;
}

.task-list ul,
.completed-task-list ul {
  list-style-type: none;
  padding: 0;
}

.task-item,
.completed-task-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start; /* Adjusted for alignment */
  flex-direction: column; /* Adjusted for description below title */
}

.task-checkbox {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-title,
.completed-task-title {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
}

.task-description {
  font-size: 13px; /* Adjusted font size */
  color: #666;
}

.logout-btn {
  width: 120px;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none; /* Added for consistency */
  display: inline-block; /* Added for consistency */
  text-align: center; /* Added for consistency */
}
.add-task-btn {
  width: 120px;
  height: 19px;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none; /* Added for consistency */
  display: inline-block; /* Added for consistency */
  text-align: center; /* Added for consistency */
}

.logout-btn:hover,
.add-task-btn:hover {
  background-color: #218838;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
