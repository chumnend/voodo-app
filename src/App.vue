<template>
  <div class="app">
    <header class="navbar">
      <h1 class="navbar-brand">Voodo</h1>

      <nav class="navbar-nav" v-if="!isAuth">
        <router-link to="/login">Sign In</router-link>
        <router-link to="/register">Sign Up</router-link>
      </nav>
      <nav class="navbar-nav" v-else>
        <button v-on:click="logout">Log Out</button>
      </nav>
    </header>

    <router-view 
      v-on:login:user="login" 
      v-on:register:user="register"
    />
  </div>
</template>

<script>
export default{
  name: 'app',
  data() {
    return {
      isAuth: false,
      url: process.env.VUE_APP_API,
    };
  },
  mounted() {
    let token = window.localStorage.getItem('jwt');
    if(token !== null) {
      this.isAuth = true;
      this.$http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
  methods: {
    async register(email, username, password) {
      try {
        let res = await this.$http.post(`${this.url}/v1/auth/register`, {
          email,
          username,
          password
        });
        
        window.localStorage.setItem('id', res.data.id);
        window.localStorage.setItem('username', res.data.username);
        window.localStorage.setItem('jwt', res.data.token);
        this.$http.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        
        if(window.localStorage.getItem('jwt') !== null) {
          this.isAuth = true;
          this.$router.push('/');
        }
      } catch(e) {
        console.error(e.response.data.message);
      }
    },
    
    async login(login, password) {
      try {
        let res = await this.$http.post(`${this.url}/v1/auth/login`, {
          login,
          password,
        });
        
        window.localStorage.setItem('id', res.data.id);
        window.localStorage.setItem('username', res.data.username);
        window.localStorage.setItem('jwt', res.data.token);
        this.$http.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        
        if(window.localStorage.getItem('jwt') !== null) {
          this.isAuth = true;
          this.$router.push('/');
        }
      } catch(e) {
        console.log(e.response.data.message);
      }
    },
    
    logout() {
      window.localStorage.clear();
      delete this.$http.defaults.headers.common["Authorization"];
      this.isAuth = false;
      this.$router.push('/login');
    },
  }
};
</script>

<style scoped>
  .navbar {
    width: 100%;
    height: 60px;
    background: #5bb55e;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px 0 black;
  }
  
  .navbar * {
    display: inline;
  }
  
  .navbar-brand {
    margin: 0 20px;
    padding: 0;
  }
  
  .navbar-nav {
    margin: 0 20px;
    display: flex;
  }

  .navbar-nav a {
    margin: 10px;
    color: black;
    text-decoration: none;
    font-weight: bold;
  }
  
  .navbar-nav button {
    background: none;
    border: none;
    margin: 10px;
    padding: 0;
    font-size: 1rem;
    font-family: sans-serif;
    font-weight: bold;
    cursor: pointer;
  }
</style>
