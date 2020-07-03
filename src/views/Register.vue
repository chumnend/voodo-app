<template>
  <div class="register">
    <form @submit.prevent="handleSubmit">
     <header class="form-header">
        <h1>Let's Get Started!</h1>
      </header>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required autofocus>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" required autofocus>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required autofocus>
      </div>
      <div class="form-group">
        <label for="password2">Confirm Password</label>
        <input id="password2" type="password" v-model="password2" required autofocus>
      </div>
      
      <div class="container">
        <button type="submit">Register</button>
      </div>
      
      <div class="container">
        <a href="#">Already have an account?</a>
      </div>
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
      padding-top: 30px;
      width: 100%;
      box-shadow: none;
    }
    
    .form-header {
      background: white;
    }
  }
</style>
