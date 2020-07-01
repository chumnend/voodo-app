<template>
  <div class="todo">
    <h1>Todo Page</h1>
  </div>
</template>

<script>
  export default {
    name: 'Todo',
    data() {
      return {
        todos: [],
      };
    },
    mounted() {
      console.log(localStorage);
    },
    computed: {},
    methods: {},
  };
</script>

<style scoped></style>
