<template>
  <div class="todo-list">
    <div class="title-bar" v-if="!editing">
      <span>{{ title }}</span>
      <button @click="toggleEdit">Edit</button>
      <button @click="handleDelete">Delete</button>
    </div>
    <div class="edit-bar" v-else>
      <input type="text" v-model="editedTitle"/>
      <button @click="handleUpdate">Submit</button>
      <button @click="toggleEdit">Cancel</button>
    </div>

    <ul class="list">
      <todo-item 
        v-for="todo in localTodos"
        v-bind:key="todo.id"
        v-bind:id="todo.id"
        v-bind:content="todo.content"
        v-bind:completed="todo.completed"
        @update:todo="updateTodo"
        @delete:todo="deleteTodo"
      />
    </ul>

    <div class="input-bar">
      <input type="text" v-model="todoInput" />
      <button @click="addTodo">Add</button>
    </div>
  </div>
</template>

<script>
  import TodoItem from '@/components/TodoItem.vue';

  export default {
    name: 'todo-list',
    components: {
      TodoItem,
    },
    props: {
      id: Number,
      title: String,
      todos: Array,
    },
    data() {
      return {
        url: process.env.VUE_APP_API,
        editedTitle: '',
        editing: false,
        todoInput: '',
        localTodos: this.todos, // local copy to prevent page reloads
      };
    },
    methods: {

      toggleEdit() {
        this.editing = !this.editing;
        this.editedTitle = this.$props.title;
      },
      
      handleUpdate() {
        this.$emit('update:list', this.id, this.editedTitle);
        this.toggleEdit();
      },
      
      handleDelete() {
        this.$emit('delete:list', this.id);
      },
      
      async getTodos() {
        let url_prefix = this.url;
        let url_path = `/v1/list/${this.id}/todo`;
        let userId = window.localStorage.getItem('id');
        let url = `${url_prefix}${url_path}?userId=${userId}`;

        let res = await this.$http.get(url);
        this.localTodos = res.data;
      },
      
      async addTodo() {
        try {
          let url_prefix = this.url;
          let url_path = `/v1/list/${this.id}/todo`;
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          let payload = {
            content: this.todoInput,
            completed: false,
          };
          
          await this.$http.post(url, payload);
          await this.getTodos();
        } catch(e) {
          console.error(e.response.data.message);
        }
      },
      
      async updateTodo(id, content, completed) {
        try {
          let url_prefix = this.url;
          let url_path = `/v1/list/${this.id}/todo/${id}`;
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
          
          let payload = {
            content,
            completed,
          };
          
          await this.$http.put(url, payload);
          await this.getTodos();
        } catch(e) {
          console.error(e.response.data.message);
        }
      },
      
      async deleteTodo(id) {
          let url_prefix = this.url;
          let url_path = `/v1/list/${this.id}/todo/${id}`;
          let userId = window.localStorage.getItem('id');
          let url = `${url_prefix}${url_path}?userId=${userId}`;
   
          await this.$http.delete(url);
          await this.getTodos();
      },

    },
  };
</script>

<style scoped>
  .todo-list {
    border: 1px solid black;
    padding: 5px;
  }

  .title-bar {
    display: flex;
    align-items: center;
  }
  
  .title-bar button {
    height: 20px;
  }
  
  .edit-bar {
    display: flex;
    align-items: center;
  }
  
  .edit-bar button {
    height: 20px;
  }
  
  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .input-bar {
    display: flex;
  }
</style>
