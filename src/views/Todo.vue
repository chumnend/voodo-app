<template>
  <div class="todo">
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
          let url_prefix = this.url;
          let url_path = '/v1/list';
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          let res = await this.$http.get(url);
          this.todoLists = res.data;
        } catch(e) {
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
    background: #5bb55e;
    font-size: 40px;
    cursor: pointer;
  }
  
  @media screen and (max-width: 600px) {
    .container {
      display: block;
      padding: 20px 0;
    }
  }
</style>
