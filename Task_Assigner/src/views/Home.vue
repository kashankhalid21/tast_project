<template>
  <div class="home">
    <h3>Tasks</h3>
    <div v-for="item in tasks" v-bind:key="tasks">
    <li>{{item}}</li>
    </div>
    <h3>Employees</h3>
    <div v-for="item in employees" v-bind:key="employees">
    <li>{{item}}</li>
    </div>
    <br>
    <button :class="button" @click="sortdata">Sort</button>
     <TableView
    :headers="columns"
    :rows="items"      
    :sort="sort1"
  >
    <template v-slot:items="{ row }" :items="items.due_date">
      <td>{{ row.task }}</td>
      <td>{{ row.employee }}</td>   
      <td>{{ row.due_date }}</td>              
            
    </template>

  <template v-slot:no-data>
      <span>No data</span>
    </template>
  </TableView>

    <div class="separator">---&#10043;---</div>

    
  </div>
</template>

<script>
// challenge
//   - when the filter changes, only show those projects
//   - e.g. if we click 'completed' only show completed project
//   - use a computed property to do this

import SingleProject from '../components/SingleProject.vue'
import { array, object, string, number, func, date} from 'alga-js'
import TableView from '@/components/TableView'

export default {

  name: 'Home',
  components: { SingleProject, TableView },
  data() {
    return {
      columns: [
        {
          "label":"Task",
          "field":"task",
          "sortable":false,
          "type":"String"
        },
        {
          "label":"Employee",
          "field":"employee",
          "sortable":false,
          "type":"String"
        },
        {
          "label":"Due Date",
          "field":"date",
          "sortable":false,
          "type":"String"
          },
        ],

      add_tasks:[],
      items: [],
      tasks:[],
      date:[],
      employees:[],

      sort1:{
        field: "date",
        order: 'desc'
      },      
      pagination:{
        itemsPerPage: 7,
        align: 'center',
        visualStyle: 'select'
      }
    }
  },
  
  
  methods: {
    async sortdate(){
      console.log("here")
      await this.add_tasks.sort((a, b) => {
        return new Date(b.due_date) - new Date(a.due_date); // descending
      })

    console.log(this.add_tasks)
    this.items=this.add_tasks

    },
    sortdata(){
       this.tasks= this.tasks.sort()
       this.employees= this.employees.sort()
    },
    handeldata(){
      this.tasks=this.add_tasks.map(data => data.task)
      this.employees=this.add_tasks.map(data => data.employee)

    },
    
  },
  async mounted() {
    await fetch('http://localhost:3000/employees')
      .then(res => res.json())
      .then(data => this.add_tasks = data)
      .catch(err => console.log(err))

      this.sortdate()
      this.handeldata()
  
  },
}
</script>
<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);

body, html{
  height: 100%;
}
button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
  }
#app {
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 90%;
  margin: 0 auto;
}
h1{
  margin-bottom: 2em;
  color: #f90;
}
.separator{
  margin: 2em 0;
  text-align: center;
}
.custom-style {
  // Table styles
  .ozn-table {
    border-collapse: collapse;
    width: 100%;
    thead {
      th { 
        border-bottom: 1px solid #ffffff;
        padding: 0 10px;
        height: 48px;
        text-align: left; 
        font-size: 1em; 
        color: #fff;
        background-color: #7cc3fd; 
        cursor: pointer; 
        &:hover{
          span{
            text-decoration: underline;
            text-decoration-style: dotted;
          }
        }        
        i{
          color: #ffffff; 
          &.active{
            color: #ff00aa;
            + span{
              color: #a9237c;
            }
          }
        }       
      }
    }
    tbody {
      tr{
        &:nth-child(odd){
          background-color: #e9f5ff;
        }
        &:nth-child(even){
          background-color: #fafaeb;
        }
      }
      td {
        border-bottom: 1px solid #ffffff;
        padding: 0 10px;
        height: 48px;
        font-size: 1em; 
      }
    }
  }
  // Paginator styles    
  .ozn-paginator{
    margin-top: .5em;
    select{
      border: 1px solid #7cc3fd;
      border-radius: 8px;
      color: #ffffff;
      background-color:  #7cc3fd;
      outline: none;
    }
    button{
      border: 1px solid #7cc3fd;
      border-radius: 8px;
      color: #ffffff;
      background-color:  #7cc3fd;
      outline: none;
    }    
  }

}
</style>