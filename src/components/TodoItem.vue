<template>
  <li class="todo-item">
    <div v-if="!editing">
      <input type="checkbox" class="checkbox" v-model="checked" @click="handleToggle">
      <p class="content">{{ content }}</p>
      <button @click="toggleEdit"><i class="fas fa-edit"></i></button>
      <button @click="handleDelete"><i class="fas fa-trash"></i></button>
    </div>
    <div v-else>
      <input class="text" type="text" v-model="editedContent"/>
      <button @click="handleUpdate"><i class="fas fa-check"></i></button>
      <button @click="toggleEdit"><i class="fas fa-times"></i></button>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'todo-item',
    props: {
      id: Number,
      content: String,
      completed: Boolean,
    },
    data() {
      return {
        checked: this.completed,
        editedContent: '',
        editing: false,    
      };
    },
    methods: {
      
      toggleEdit() {
        this.editing = !this.editing;
        this.editedContent = this.content;
      },
      
      handleToggle() {
        this.$emit('update:todo', this.id, this.content, !this.completed);
      },
      
      handleUpdate() {
        this.$emit('update:todo', this.id, this.editedContent, this.completed);
        this.toggleEdit();
      },
      
      handleDelete() {
        this.$emit('delete:todo', this.id);
      },
      
    }
  };
</script>

<style scoped>
  .todo-item {
    width: 100%;
  }

  div {
    display: flex;
    align-items: center;
  }
  
  .checkbox {
    min-width: 25px;
    min-height: 25px;
  }
  
  .content {
    padding: 6px 12px;
    word-wrap: break-word;
    overflow: hidden;
    flex-grow: 1;
  }
  
  .text {
    flex-grow: 1;
  }
  
  div button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 16px;
  }
</style>
