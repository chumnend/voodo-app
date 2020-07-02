<template>
  <li class="todo-item">
    <div class="content" v-if="!editing">
      <input type="checkbox" @click="handleToggle"/>
      <p>{{ content }}</p>
      <button @click="toggleEdit">Edit</button>
      <button @click="handleDelete">Delete</button>
    </div>
    <div class="edit-bar" v-else>
      <input type="text" v-model="editedContent"/>
      <button @click="handleUpdate">Submit</button>
      <button @click="toggleEdit">Cancel</button>
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
  .content {
    display: flex;
    align-items: center;
  }
  
  .content button {
    height: 20px;
  }
  
  .edit-bar {
    display: flex;
    align-items: center;
  }
  
  .edit-bar button {
    height: 20px;
  }
</style>
