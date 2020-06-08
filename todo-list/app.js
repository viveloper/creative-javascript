// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', initApp);

// Functions
function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.trim() === '') return;

  const newTodo = {
    id: uuidv4(),
    text: todoInput.value,
    completed: false,
  };

  // Update UI
  addTodoUI(newTodo);

  // Save to Local
  saveLocalTodo(newTodo);

  // Clear Todo Input Value
  todoInput.value = '';
}

function addTodoUI(todo) {
  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.className = todo.completed ? 'todo completed' : 'todo';
  todoDiv.dataset.id = todo.id;
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todo.text;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // Check Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // Append To List
  todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
  // Delete Todo
  if (e.target.classList.contains('trash-btn')) {
    const todo = e.target.parentElement;
    deleteLocalTodo(todo.dataset.id);
    deleteTodoUI(todo);
  }

  // Check Mark
  if (e.target.classList.contains('complete-btn')) {
    const todo = e.target.parentElement;
    const targetTodo = getLocalTodos().find(
      (localTodo) => localTodo.id === todo.dataset.id
    );
    updateLocalTodo(todo.dataset.id, {
      text: targetTodo.text,
      completed: !targetTodo.completed,
    });
    checkTodoUI(todo);
  }
}

function deleteTodoUI(todoEl) {
  // Animation
  todoEl.classList.add('fall');
  todoEl.addEventListener('transitionend', () => {
    todoEl.remove();
  });
}

function checkTodoUI(todoEl) {
  todoEl.classList.toggle('completed');
}

function filterTodo(e) {
  // console.log(e.target.value);
  const filter = e.target.value;
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (filter) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        todo.style.display = todo.classList.contains('completed')
          ? 'flex'
          : 'none';
        break;
      case 'uncompleted':
        todo.style.display = todo.classList.contains('completed')
          ? 'none'
          : 'flex';
        break;
      default:
        break;
    }
  });
}

function saveLocalTodo(todo) {
  const todos = getLocalTodos();
  todos.push(todo);
  setLocalTodos(todos);
}

function deleteLocalTodo(id) {
  const todos = getLocalTodos();
  setLocalTodos(todos.filter((todo) => todo.id !== id));
}

function updateLocalTodo(id, todo) {
  const localTodos = getLocalTodos();

  setLocalTodos(
    localTodos.map((localTodo) => {
      return localTodo.id === id ? { id, ...todo } : localTodo;
    })
  );
}

function getLocalTodos() {
  const todos = !localStorage.getItem('todos')
    ? []
    : JSON.parse(localStorage.getItem('todos'));
  return todos;
}

function setLocalTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function initApp() {
  const todos = getLocalTodos();

  todos.forEach((todo) => {
    addTodoUI(todo);
  });
}
