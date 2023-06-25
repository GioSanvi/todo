function createTodoItem(todo) {
  const Todo = document.createElement('li')
  const ActionContainer = document.createElement('span')
  const TextContainer = document.createElement('span')
  const CheckBox = createCheckBox(todo)
  const RemoveBtn = createRemoveButton(todo)

  ActionContainer.setAttribute('class', 'actions')
  TextContainer.setAttribute('class', 'todo-text')
  Todo.setAttribute('class', 'todo')
  Todo.setAttribute('id', todo.id)
  Todo.setAttribute('data-todo', todo.completed)

  TextContainer.textContent = todo.title
  ActionContainer.appendChild(CheckBox)
  ActionContainer.appendChild(RemoveBtn)

  Todo.appendChild(TextContainer)
  Todo.appendChild(ActionContainer)
  return Todo
}
