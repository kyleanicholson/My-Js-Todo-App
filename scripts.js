const storedTodos = localStorage.getItem("todos");
const todoContainer = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");
const completeTodoButton = document.querySelector("#complete-todo");

// Load Data (if it exists)
let TODOS = []; // init global state's todos
let todoID = 0; // init global state's todoID
if (storedTodos) {
  TODOS = JSON.parse(storedTodos);
} else {
  TODOS = [
    { id: -1, text: "Buy milk" },
    { id: -2, text: "Do laundry" },
    { id: -3, text: "Clean the house" },
  ];
}

// Save Data
const saveData = () => {
  localStorage.setItem("todos", JSON.stringify(TODOS));
};

// DOM Manipulation Functions

const createTodoElement = (todo) => {
  let li = document.createElement("li");

  // Add a checkbox to track completion
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = todo.id;

  // Add the todo text
  li.appendChild(checkbox);
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
    console.log("TODOS: ", TODOS);
  }
};

const updateDOM = () => {
  buildTodoList(TODOS);
  let todoElements = document.querySelectorAll(".todo-item");
  todoElements.forEach((todoElement) => {
    todoElement.addEventListener("click", handleTodoClick);
  });
  saveData();
};

const completeTodo = (id) => {
  for (let todo of TODOS) {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  }
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
};

// Utility Functions
const getTodoFromInput = () => {
  let inputVal = todoInput.value;
  if (inputVal) {
    let newTodoID = todoID++;
    todoInput.value = "";
    console.log(`New todo added successfully!\n ${inputVal}`);
    return { id: newTodoID, text: `${inputVal}` };
  } else {
    console.log("Input not found or invalid");
    return null;
  }
};

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
completeTodoButton.addEventListener("click", () => {});
// Check which todos are checked and complete them when the button is clicked
completeTodoButton.addEventListener("click", () => {
  let selectedTodos = document.querySelectorAll(".selected");
  selectedTodos.forEach((todo) => {
    let todoID = todo.id;
    completeTodo(todoID);
  });
});
