<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">
      <header class="form-header">
        <h1>Welcome Back!</h1>
      </header>
      
      <div class="form-group">
        <label for="login">Email/Username</label>
        <input id="login" type="text" v-model="login" required autofocus>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required autofocus>
      </div>
      
      <div class="container">
        <button type="submit" :disabled="invalidFields">Login</button>
      </div>
      
      <div class="container">
        <a href="#" @click="notImplemented">Forgot Username/Password?</a>
        <router-link to="/register">Create an account!</router-link>
      </div>
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
      
      invalidFields() {
        return this.login === '' || this.password === '';
      }
      
    },
    methods: {
      
      handleSubmit() {
        this.$emit('login:user', this.login, this.password);
      },
      
      notImplemented() {
        alert('Not Yet Implemented.');
      },
      
    }
  };
</script>

<style scoped>
  form {
    width: 500px;
    margin: 0 auto;
    box-shadow:
      0 2px 2px rgba(0,0,0,0.2),        
      0 1px 5px rgba(0,0,0,0.2),        
      0 0 0 12px rgba(255,255,255,0.4); 
  }

  .form-header {
    text-align: center;
    background: #5bb55e;
    padding: 12px 0;
  }
  
  h1 {
    margin: 0;
    padding: 0;
  }
  
  .form-group {
    margin: 12px 0;
    padding: 0 20px;
  }
  
  .form-group input {
    width: 100%;
    margin: 8px 0;
    padding: 12px 20px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 12px 20px;
    background: #5bb55e;
    border: none;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .container {
    margin: 12px 0;
    padding: 6px 20px;
    text-align: center;
  }
  
  .container a {
    display: block;
    margin: 6px 0;
  }
  
  @media screen and (max-width: 600px) {
    form {
      width: 100%;
      padding-top: 30px;
      box-shadow: none;
    }
    
    .form-header {
      background: white;
    }
  }
</style>
