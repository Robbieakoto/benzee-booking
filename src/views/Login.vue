<template>
  <div class="home bg-gray-50 h-screen">
    <Login />
  </div>
</template>
<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login
  }
};
</script>
