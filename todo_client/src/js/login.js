function renderLoginForm() {
  const LOGIN_FORM = document.createElement('form')
  const USERNAME_FIELD = document.createElement('input')
  const PASSWORD_FIELD = document.createElement('input')
  const LOGIN_BTN = document.createElement('button')

  LOGIN_FORM.setAttribute('class', 'todo-form')
  LOGIN_BTN.setAttribute('class', 'add-btn')
  Button.setAttribute('type', 'submit')
  USERNAME_FIELD.setAttribute('class', 'todo-input')
  PASSWORD_FIELD.setAttribute('class', 'todo-input')
  PASSWORD_FIELD.setAttribute('type', 'password')
  PASSWORD_FIELD.setAttribute('autocomplete', 'off')
  USERNAME_FIELD.setAttribute('placeholder', 'Username')
  PASSWORD_FIELD.setAttribute('placeholder', 'Password')

  LOGIN_BTN.textContent = 'Login'

  app.appendChild(LOGIN_FORM)
  LOGIN_FORM.appendChild(USERNAME_FIELD)
  LOGIN_FORM.appendChild(PASSWORD_FIELD)
  LOGIN_FORM.appendChild(LOGIN_BTN)

  LOGIN_FORM.addEventListener('submit', function (e) {
    e.preventDefault()
    const username = USERNAME_FIELD.value
    const password = PASSWORD_FIELD.value

    if (username.trim() && password.trim()) {
      login({ password, username }).then(() => reload())
    }

    Input.value = ''
  })
}
