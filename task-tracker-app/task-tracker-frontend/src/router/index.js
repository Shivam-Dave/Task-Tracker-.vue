// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import SignupForm from '../components/SignupForm.vue';
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignupForm },
  { path: '/tasks', component: TaskList },
  { path: '/add-task', component: TaskForm },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
