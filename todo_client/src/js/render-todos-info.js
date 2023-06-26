const Total = document.createElement('span')
const Complete = document.createElement('span')
const Pending = document.createElement('span')
const User = document.createElement('span')
const Info = document.createElement('div')
const UserInfo = document.createElement('div')
const LogoutBtn = document.createElement('button')

TodoSection.prepend(TodoInfo)
LogoutBtn.setAttribute('class', 'logout-btn')

Info.appendChild(Total)
Info.appendChild(Complete)
Info.appendChild(Pending)

UserInfo.appendChild(User)

TodoInfo.appendChild(Info)
TodoInfo.appendChild(UserInfo)

LogoutBtn.addEventListener('click', function (e) {
  e.preventDefault()
  logout()
  TodoInfo.removeChild(UserInfo)
  TodoInfo.removeChild(Info)
})

function renderTodosInfo(todoList) {
  UserInfo.appendChild(LogoutBtn)
  const completed = todoList.filter((todo) => todo.completed)
  const pending = todoList.filter((todo) => !todo.completed)
  const user = getUser()

  Total.textContent = 'Todos: ' + todoList.length
  Complete.textContent = 'Completed: ' + completed.length
  Pending.textContent = 'Pending: ' + pending.length
  User.textContent = '@' + user.username
  LogoutBtn.textContent = 'Logout'
}
