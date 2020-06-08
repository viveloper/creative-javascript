// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.trim() === '') return;

  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
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
  // Clear Todo Input Value
  todoInput.value = '';
}

function deleteCheck(e) {
  // Delete Todo
  if (e.target.classList.contains('trash-btn')) {
    const todo = e.target.parentElement;
    // Animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  // Check Mark
  if (e.target.classList.contains('complete-btn')) {
    const todo = e.target.parentElement;
    todo.classList.toggle('completed');
  }
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
