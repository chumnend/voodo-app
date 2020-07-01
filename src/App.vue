<template>
  <div id="app">
    <header>
      <h1>Voodo</h1>
      
      <div v-if="!isAuth">
        <router-link to="/login">Sign In</router-link>
        <router-link to="/register">Sign Up</router-link>
      </div>
      <div v-else>
        <button v-on:click="logout">Log Out</button>
      </div>
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
    if(localStorage.getItem('jwt') !== null) {
      this.isAuth = true;
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
        
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('jwt', res.data.token);
        
        if(localStorage.getItem('jwt') !== null) {
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
        
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('jwt', res.data.token);
        
        if(localStorage.getItem('jwt') !== null) {
          this.isAuth = true;
          this.$router.push('/');
        }
      } catch(e) {
        console.log(e.response.data.message);
      }
    },
    logout() {
      localStorage.clear();
      this.isAuth = false;
      this.$router.push('/login');
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
