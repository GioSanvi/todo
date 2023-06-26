const Form = document.createElement('form')
const Input = document.createElement('input')
const Button = document.createElement('button')

Form.setAttribute('class', 'todo-form')
Button.setAttribute('class', 'add-btn')
Button.setAttribute('type', 'submit')
Input.setAttribute('class', 'todo-input')
Input.setAttribute('placeholder', 'Enter Todo')

Button.textContent = 'Add'

function addTodoForm() {
  app.prepend(Form)
  Form.appendChild(Input)
  Form.appendChild(Button)

  Form.addEventListener('submit', function (e) {
    const TODOS = getTodos()
    e.preventDefault()
    const value = Input.value

    if (value.trim()) {
      addTodo({ title: value, completed: false }).then(() => init())
    }

    Input.value = ''
  })
}
