const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const activeCount = document.getElementById('active-count');
const completedCount = document.getElementById('completed-count');

const STORAGE_KEY = 'todos';

let todos = [];

document.addEventListener('DOMContentLoaded', loadTodos);


function loadTodos() {
    todos = getTodosFromStorage();
    renderAllTodos();
    updateUI();
}

// GET TODOS FROM LOCALSTORAGE
function getTodosFromStorage() {
    const todosJSON = localStorage.getItem(STORAGE_KEY);
    return todosJSON ? JSON.parse(todosJSON) : [];
}

// SAVE TODOS TO LOCALSTORAGE
function saveTodosToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// RENDER TODOS
function renderAllTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        renderTodoItem(todo);
    });
}

// RENDER A TODO
function renderTodoItem(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    
    if (todo.completed) {
        li.classList.add('completed');
    }
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// ADD NEW TODO
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        todoInput.classList.add('error');
        setTimeout(() => {
            todoInput.classList.remove('error');
        }, 400);
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };
    
    todos.push(todo);
    saveTodosToStorage();
    renderAllTodos();
    updateUI();
    
    todoInput.value = '';
    todoInput.focus();
}

// TOGGLE TODO COMPLETION
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage();
        renderAllTodos();
        updateUI();
    }
}

// DELETE TODO
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodosToStorage();
    renderAllTodos();
    updateUI();
}

function updateUI() {
    const activeTodos = todos.filter(t => !t.completed).length;
    const completedTodos = todos.filter(t => t.completed).length;
     
    activeCount.textContent = activeTodos;
    completedCount.textContent = completedTodos;
    
    if (todos.length === 0) {
        emptyState.classList.add('show');
        todoList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        todoList.style.display = 'flex';
    }
}


// EVENT LISTENERS
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();   
        addTodo();            
    }
});