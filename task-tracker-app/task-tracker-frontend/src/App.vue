<!-- src/App.vue -->
<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  background: #fff;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  margin: 20px;
}

h1,
h2 {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 300;
  color: #333;
  text-align: center;
}

button {
  display: block;
  width: 100%;
  padding: 15px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 20px 0;
}

input,
textarea {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
}
</style>
