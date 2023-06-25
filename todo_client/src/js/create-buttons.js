function createCheckBox(todo) {
  const TODOS = getTodos()
  const CheckBox = document.createElement('input')
  CheckBox.setAttribute('type', 'checkbox')
  CheckBox.checked = todo.completed

  CheckBox.addEventListener('click', function () {
    CheckBox.parentNode.setAttribute('data-todo', !todo.completed)
  })
  return CheckBox
}

function createRemoveButton() {
  const Cross = document.createElement('span')
  Cross.setAttribute('class', 'remove-btn')
  Cross.textContent = 'X'

  Cross.addEventListener('click', function (e) {
    const Parent = e.target.parentNode
    Parent.parentNode.classList.add('remove-todo')

    // setTimeout(() => renderTodos(), 1000)
  })

  return Cross
}
