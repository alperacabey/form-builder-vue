<template>
  <nav class="bg-gray-dark p-2.5 shadow-header absolute w-full sticky top-0">
    <router-link to="/">Form Builder</router-link> |
    <router-link to="/form/86d25d21-539a-4472-ac74-823c85eea236"
      >Form Conductor</router-link
    >
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #4ad862;
    }
  }
}
</style>
