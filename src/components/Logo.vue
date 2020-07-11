<template>
  <router-link :to="{name: 'Home'}">
    <img class="h-20 w-auto" :class="imageClass" src="@/assets/images/logo.png" alt="logo" />
  </router-link>
</template>
<script>
export default {
  name: "Logo",
  props: ["imageClass"]
};
</script>