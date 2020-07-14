<template>
  <div class="todo">
    <div class="loader" v-if="loading">
      <span class="circle circle-1"></span>
      <span class="circle circle-2"></span>
      <span class="circle circle-3"></span>
    </div>
    <div v-else>
      <p v-if="isEmpty" class="message">
        You currently have no lists! Get started by pressing the add button.
      </p>
      <div v-else class="container">
        <todo-list 
          v-for="todoList in todoLists"
          v-bind:key="todoList.id"
          v-bind:id="todoList.id"
          v-bind:title="todoList.title"
          v-bind:todos="todoList.todos"
          @update:list="updateTodoList"
          @delete:list="deleteTodoList"
        />
      </div>
    </div>

    <button @click="addTodoList">+</button>
  </div>
</template>

<script>
  import TodoList from '@/components/TodoList.vue';

  export default {
    name: 'todo',
    components: {
      TodoList,
    },
    data() {
      return {
        url: process.env.VUE_APP_API,
        todoLists: [],
        loading: false,
      };
    },
    computed: {
      isEmpty() {
        return this.todoLists.length === 0;
      }
    },
    mounted() {
      this.getTodoLists();
    },
    methods: {
      
      async getTodoLists() {
        try {
          this.loading = true;
          
          let url_prefix = this.url;
          let url_path = '/v1/list';
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          let res = await this.$http.get(url);
          this.todoLists = res.data;
          this.loading = false;
        } catch(e) {
          this.loading = false;
          console.error(e.response.data.message);
        }
      },
      
      async addTodoList() {
        try {
          let url_prefix = this.url;
          let url_path = '/v1/list';
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          let payload = {
            title: `todo-${ Date.parse(new Date()) }`,
          };
          
          await this.$http.post(url, payload);
          await this.getTodoLists();
        } catch(e) {
          console.error(e.response.data.message);
        }
      },
      
      async updateTodoList(id, title) {
        try {
          let url_prefix = this.url;
          let url_path = `/v1/list/${id}`;
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          let payload = {
            title,
          };
          
          await this.$http.put(url, payload);
          await this.getTodoLists();
        } catch(e) {
          console.error(e.response.data.message);
        }
      },
      
      async deleteTodoList(id) {
        try {
          let url_prefix = this.url;
          let url_path = `/v1/list/${id}`;
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          await this.$http.delete(url);
          await this.getTodoLists();
        } catch(e) {
          console.error(e.response.data.message);
        }
      },
      
    },
  };
</script>

<style scoped>
  .todo {
    width: 100%;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
  
  .message {
    margin: 0 auto;
    text-align: center;
  }
  
  button {
    width: 50px;
    height: 50px;
    position: fixed;
    right: 30px;
    bottom: 20px;
    border: none;
    border-radius: 50%;
    box-shadow: 2px 2px 5px 2px #919191;
    background: #8bf08e;
    font-size: 40px;
    cursor: pointer;
    outline: none;
  }

  .loader {
    position: relative;
    text-align: center;
  }
  
  .circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 3px;
    background-color: black;
    border-radius: 50%;
    animation: loading 1.5s cubic-bezier(.8, .5, .2, 1.4) infinite;
    transform-origin: bottom center;
    position: relative;
  }
  
  .circle-1 {
    animation-delay: 0.1s;
  }
  
  .circle-2 {
    animation-delay: 0.3s;
  }
  
  .circle-3 {
    animation-delay: 0.5s
  }
  
  @keyframes loading {
    0%{
      opacity: 0.5;
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0.5;
    }
  }
  
  @media screen and (max-width: 600px) {
    .container {
      display: block;
      padding: 20px 0;
    }
    
    .message {
      padding: 30px;
    }
  }
</style>
