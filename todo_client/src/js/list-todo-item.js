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

function setUser(data) {
  try {
    localStorage.setItem('user', JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}

function getUser() {
  try {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : null

    return user
  } catch (err) {
    console.log(err)
  }
}

function removeUser() {
  try {
    localStorage.removeItem('user')
  } catch (err) {
    console.log(err)
  }
}

function reload() {
  window.location.reload()
}

function fetchUrl(url, data = {}) {
  const user = getUser()
  const token = user ? user.token : ''

  return fetch(url, {
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    ...data,
  })
}

function renderTodos(data = []) {
  const todoList = Array.isArray(data) ? data : []
  addTodoForm()
  const todos = todoList.map((todo) => createTodoItem(todo))
  TodoList.replaceChildren(...todos)
  renderTodosInfo(todoList)
}

function getTodos() {
  return fetchUrl(API + 'todos')
    .then((res) => {
      if (res.status === 401) {
        logout()
        return
      }
      return res.json()
    })
    .then((data) => data)
    .catch((err) => console.log(err))
}

function addTodo(todo) {
  return fetchUrl(API + 'todos', {
    method: 'POST',
    body: JSON.stringify(todo),
  }).catch((err) => console.log(err))
}

function deleteTodo(id) {
  return fetchUrl(API + 'todos/' + id, {
    method: 'DELETE',
  }).catch((err) => console.log(err))
}

function completeTodo(id) {
  return fetchUrl(API + 'todos/' + id + '/complete', {
    method: 'PUT',
  }).catch((err) => console.log(err))
}

function login(data) {
  return fetchUrl(API + 'login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => setUser(data))
    .catch((err) => console.log(err))
}

function logout() {
  removeUser()
  reload()
}

function init() {
  if (getUser()) {
    getTodos().then((data) => renderTodos(data))
  } else {
    renderLoginForm()
  }
}

init()
