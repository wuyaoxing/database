<template>
    <div>
        <h2>dexie</h2>
        <p>Add Todo:</p>
        <input type="text" v-model="value">
        <button @click="addTodo">Add Todo</button>
        <p>TodoList:</p>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <input type="checkbox" :checked="todo.done" @change="toggeleTodo(todo.id, $event.target.checked
)">
                {{todo.title}}
                {{todo}}
                <span @click="deleteTodo(todo.id)">X</span>
            </li>
        </ul>
    </div>
</template>
<script>
import Dexie from 'dexie'

const db = new Dexie('VueSampleDB')
db.version(1.0).stores({ todos: '++id' })

export default {
    data() {
        return {
            todos: [],
            value: ''
        }
    },
    methods: {
        addTodo() {
            const todo = {
                title: this.value,
                done: false,
            }
            db.table('todos')
              .add(todo)
              .then(id => {
                  const newList = [...this.todos, Object.assign({}, todo, { id })]
                  this.todos = newList
                  this.value = ''
              })
        },
        deleteTodo(id) {
            db.table('todos')
              .delete(id)
              .then(() => {
                  const newList = this.todos.filter(todo => todo.id !== id)
                  this.todos = newList
              })
        },
        toggeleTodo(id, done) {
            db.table('todos')
              .update(id, { done })
              .then(() => {
                  const todoToUpdate = this.todos.find(todo => todo.id === id)
                  const newList = [
                      ...this.todos.filter(todo => todo.id !== id),
                      Object.assign({}, todoToUpdate, { done })
                  ]
                  this.todos = newList
              })
        }
    },
    mounted() {
        db.table('todos')
          .toArray()
          .then(todos => {
              this.todos = todos
          })
    }
}
</script>

