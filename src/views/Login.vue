<template>
  <div class="login">
    <h1>Login Page</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="login">Email and/or Username</label>
        <input id="login" type="text" v-model="login" required autofocus>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required autofocus>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        login: '',
        password: '',
      };
    },
    computed: {
      validate() {
        return this.login !== '' && this.password !== '';
      }
    },
    methods: {
      handleSubmit() {
        if(!this.validate) {
          alert('Error');
          return;
        }
        
        this.$emit('login:user', this.login, this.password);
      }
    }
  };
</script>

<style scoped></style>
