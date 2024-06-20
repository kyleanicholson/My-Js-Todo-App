const storedTodos = localStorage.getItem("todos");
const todoContainer = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");
const completeTodoButton = document.querySelector("#complete-todo");

// Load Data (if it exists)
let TODOS = []; // init global state 
if (storedTodos) {
    TODOS = JSON.parse(storedTodos);
} else {
    TODOS = [
        {text: "Buy milk"},
        {text: "Do laundry"},
        {text: "Clean the house"},
    ];
}

// Save Data
const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(TODOS));
};

// DOM Manipulation Functions

const createTodoElement = (todo) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(todo.text));

    // Add a class if the todo is completed
    if (todo.completed) {
        li.classList.add("completed");
    }

    return li;
};

const buildTodoList = (todoList) => {
    todoContainer.innerHTML = "";
    for (let todo of todoList) {
        let li = createTodoElement(todo);
        li.classList.add("todo-item");
        todoContainer.appendChild(li);
    }
};

const updateDOM = () => {
    buildTodoList(TODOS);
    let todoElements = document.querySelectorAll(".todo-item");
    todoElements.forEach((todoElement) => {
        todoElement.addEventListener("click", handleTodoClick);
    });
    saveData();
}


const completeTodo = (index) => {
    TODOS[index].completed = true;
    updateDOM();
};


// Event Handler Functions
const handleTodoClick = (e) => {
    let clickedTodo = e.target;
    if (clickedTodo.classList.contains("selected")) {
        clickedTodo.classList.remove("selected");
    } else {
        clickedTodo.classList.add("selected");
    }
};

const handleAddTodoClick = () => {
    let todo = getTodoFromInput();
    if (todo) {
        TODOS.push(todo);
        updateDOM();
    }
}

const handleCompleteClick = () => {
    let selectedTodos = document.querySelectorAll(".selected");
    selectedTodos.forEach((selectedTodo) => {
        let index = Array.from(todoContainer.children).indexOf(selectedTodo);
        completeTodo(index);
        selectedTodo.classList.remove("selected");
    });
}

// Utility Functions
const getTodoFromInput = () => {
    let inputVal = todoInput.value;
    if (inputVal) {
        console.log(`Input value of add todo ${inputVal}`);
        todoInput.value = "";
        return {text: `${inputVal}`};
    } else {
        console.log("Input not found or invalid");
        return null;
    }
}


// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    buildTodoList(TODOS);
    updateDOM();
});

todoInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        handleAddTodoClick();
    }
});

addTodoButton.addEventListener("click", handleAddTodoClick);
completeTodoButton.addEventListener("click", handleCompleteClick);



