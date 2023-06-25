const Form = document.createElement('form')
const Input = document.createElement('input')
const Button = document.createElement('button')

Form.setAttribute('class', 'todo-form')
Button.setAttribute('class', 'add-btn')
Button.setAttribute('type', 'submit')
Input.setAttribute('class', 'todo-input')
Input.setAttribute('placeholder', 'Enter Todo')

Button.textContent = 'Add'

app.appendChild(Form)
Form.appendChild(Input)
Form.appendChild(Button)

Form.addEventListener('submit', function (e) {
  const TODOS = getTodos()
  e.preventDefault()
  const value = Input.value

  if (value.trim()) {
    fetch('http://localhost:8000/api/todos', {
      method: 'POST',
      headers: {
        Authorization: 'Token 6cdb2f8e75cf91dc88eb8a3f933aa9e8551788c3',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: value, completed: false }),
    })
      .then(() => init())
      .catch((err) => console.log(err))
  }

  Input.value = ''
})
