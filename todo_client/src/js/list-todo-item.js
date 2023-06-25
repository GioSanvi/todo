const app = document.getElementById('app')
const heading = document.createElement('h1')
const TodoSection = document.createElement('section')
const TodoInfo = document.createElement('div')
const TodoList = document.createElement('ul')

// ******** Setting Element attributes *******
heading.setAttribute('class', 'heading')
TodoSection.setAttribute('class', 'todo-section')
TodoInfo.setAttribute('class', 'todo-info')
TodoList.setAttribute('class', 'todo-list')

// ******** Set Element Content *******
heading.textContent = 'Todo App'
app.appendChild(heading)
app.appendChild(TodoSection)
TodoSection.appendChild(TodoList)

const API = 'http://localhost:8000/api/'

function renderTodos(data = []) {
  const todoList = [...data]
  const todos = todoList.map((todo) => createTodoItem(todo))
  TodoList.replaceChildren(...todos)
}

function getTodos ()  {
    return fetch(API + 'todos', {
        headers: {
            Authorization: 'Token 6cdb2f8e75cf91dc88eb8a3f933aa9e8551788c3',
        },
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
}


function addTodo (todo) {
    return fetch(API + 'todos', {
        method: 'POST',
        headers: {
            Authorization: 'Token 6cdb2f8e75cf91dc88eb8a3f933aa9e8551788c3',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    }).catch((err) => console.log(err))
}


function deleteTodo (id) {
    return  fetch(API + 'todos/' + id, {
        method: 'DELETE',
        headers: {
            Authorization: 'Token 6cdb2f8e75cf91dc88eb8a3f933aa9e8551788c3',
            'Content-Type': 'application/json',
        },
    }).catch((err) => console.log(err))
}


function completeTodo (id)  {
    return  fetch(API + 'todos/' + id + '/complete', {
        method: 'PUT',
        headers: {
            Authorization: 'Token 6cdb2f8e75cf91dc88eb8a3f933aa9e8551788c3',
            'Content-Type': 'application/json',
        },
    }).catch((err) => console.log(err))
}


function init  () {
  getTodos().then((data) => renderTodos(data))
}

init()
