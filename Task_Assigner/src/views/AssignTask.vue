<template>
  <form @submit.prevent="handleSubmit">
    <label>Task</label>
    <input type="text" v-model="task" required>
    <label>Employee</label>
    <input type="text" v-model="employee" required>
    <label>Due Date</label>
    <input type="date" v-model="due_date" required>
    <button>Assign</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      details: ''
    }
  },
  methods: {
    handleSubmit() {
      let project = {
        task: this.task,
        employee: this.employee,
        due_date:this.due_date.toString(),
        id: Math.floor(Math.random() * 10000)
      }
      console.log(project)
  
     fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      }).then(() => {
        this.$router.push('/')
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style>
  form {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0
  }
  input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
  }
  form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
  }
</style>