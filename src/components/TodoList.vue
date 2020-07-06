<template>
  <div class="todo-list">
    <header v-if="!editing">
      <p>{{ title }}</p>
      <button @click="toggleEdit">
        <i class="fas fa-edit"></i>
      </button>
      <button @click="handleDelete">
        <i class="fas fa-trash"></i>
      </button>
    </header>
    <header v-else>
      <input type="text" v-model="editedTitle"/>
      <button @click="handleUpdate" :disabled="invalidTitle">
        <i class="fas fa-check"></i>
      </button>
      <button @click="toggleEdit">
        <i class="fas fa-times"></i>
      </button>
    </header>
    
    <hr>
    
    <ul>
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

    <div class="todo-input">
      <input type="text" v-model="todoInput" />
      <button @click="addTodo" v-bind:disabled="invalidInput">Add</button>
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
    computed: {
      
      invalidTitle() {
        return this.editedTitle === '';
      },
      
      invalidInput() {
        return this.todoInput === '';
      },
      
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
          this.todoInput = '';
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
    padding: 20px;
    box-shadow: 2px 2px 6px 0 black;
  }
  
  header {
    display: flex;
    align-items: center;
  }
  
  header p {
    font-weight: bold;
    font-size: 20px;
    flex-grow: 1;
    padding: 12px 6px;
  }
  
  header input {
    flex-grow: 1;
  }
  
  header button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 16px;
  }
  
  ul {
    padding: 20px 0; 
  }
  
  .todo-input {
    display: flex;
  }
  
  .todo-input input {
    flex-grow: 1;
    padding: 6px 12px;
  }
  
  .todo-input button {
    padding: 12px 20px;
    background: #5bb55e;
    border: none;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  
  @media screen and (max-width: 600px) {
    .todo-list {
      margin: 20px;
    }
  }
</style>
