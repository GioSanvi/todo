const Total = document.createElement('span')
const Complete = document.createElement('span')
const Pending = document.createElement('span')

TodoSection.prepend(TodoInfo)

TodoInfo.appendChild(Total)
TodoInfo.appendChild(Complete)
TodoInfo.appendChild(Pending)

function renderTodosInfo(todoList) {
  console.log({ todoList })
  const completed = todoList.filter((todo) => todo.completed)
  const pending = todoList.filter((todo) => !todo.completed)

  Total.textContent = 'Todos: ' + todoList.length
  Complete.textContent = 'Completed: ' + completed.length
  Pending.textContent = 'Pending: ' + pending.length
}
