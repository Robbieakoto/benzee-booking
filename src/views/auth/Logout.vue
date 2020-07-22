<template>
<div></div>
</template>
<script>
import { onLogout } from '@/vue-apollo'

export default {
  name: 'Logout',
  mounted () {
    onLogout(this.$apollo.provider.defaultClient)
    this.$router.push({ path: '/login' })
  }
}
</script>
