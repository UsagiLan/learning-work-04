<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
     <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/HomeComponents/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
