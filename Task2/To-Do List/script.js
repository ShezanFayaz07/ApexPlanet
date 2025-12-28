const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todo');

addBtn.addEventListener('click', () => {
    addTodo();
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
})

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        todoInput.classList.add('shake');

        setTimeout(() => {
            todoInput.classList.remove('shake');
        }, 300);

        return;
    }
    const todoItem = document.createElement('li');
    console.log("Item Created")

        const todoSpan = document.createElement('span');
    todoSpan.textContent = todoText;

        const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';

        todoItem.appendChild(todoSpan);
    todoItem.appendChild(deleteBtn);
    
        todoSpan.addEventListener('click', function() {
        todoItem.classList.toggle('completed');});

    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the todo click event
        deleteTodo(todoItem);
    });

        todoList.appendChild(todoItem);

         todoInput.value = '';

             todoInput.focus();
}

function deleteTodo(todoItem) {

    todoItem.classList.add('fade-out');
    

    setTimeout(() => {
        todoItem.remove();
    }, 400); 
}
