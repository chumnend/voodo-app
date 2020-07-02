<template>
  <div class="todo">
    <h1>Todo Page</h1>

    <todo-list 
      v-for="todoList in todoLists"
      v-bind:key="todoList.id"
      v-bind:id="todoList.id"
      v-bind:title="todoList.title"
      v-bind:todos="todoList.todos"
      @update:list="updateTodoList"
      @delete:list="deleteTodoList"
    />

    <button @click="addTodoList">Add List</button>
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

<style scoped></style>
