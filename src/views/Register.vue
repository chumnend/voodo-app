<template>
  <div class="register">
    <h1>Register Page</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required autofocus>
      </div>
      <div>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" required autofocus>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required autofocus>
      </div>
      <div>
        <label for="password2">Confirm Password</label>
        <input id="password2" type="password" v-model="password2" required autofocus>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        email: '',
        username: '',
        password: '',
        password2: '',
      };
    },
    computed: {
      validate() {
        return this.email !== '' && 
               this.username !== '' && 
               this.password === this.password2;
      }
    },
    methods: {
      handleSubmit() {
        if(!this.validate) {
          alert('Error');
          return;
        }
        
        this.$emit('register:user', this.email, this.username, this.password);
      }
    }
  };
</script>

<style scoped></style>
