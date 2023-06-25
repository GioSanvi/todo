function createCheckBox(todo) {
  const TODOS = getTodos()
  const CheckBox = document.createElement('input')
  CheckBox.setAttribute('type', 'checkbox')
  CheckBox.checked = todo.completed

  CheckBox.addEventListener('click', function () {
    completeTodo(todo.id).then(() => {
      CheckBox.parentNode.setAttribute('data-todo', !todo.completed)
      init()
    })
  })
  return CheckBox
}

function createRemoveButton(todo) {
  const Cross = document.createElement('span')
  Cross.setAttribute('class', 'remove-btn')
  Cross.textContent = 'X'

  Cross.addEventListener('click', function (e) {
    const Parent = e.target.parentNode
    deleteTodo(todo.id).then(() => {
      Parent.parentNode.classList.add('remove-todo')
      init()
    })
  })

  return Cross
}
