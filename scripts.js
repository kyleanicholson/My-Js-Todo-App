const storedTodos = localStorage.getItem("todos");
const todoContainer = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");
const completeTodoButton = document.querySelector("#complete-todo");
const activeTab = document.querySelector("#active-tab");
const completedTab = document.querySelector("#complete-tab");

// Load Data (if it exists)
let TODOS = []; // init global state's todos
let todoID = 0; // init global state's todoID
let exampleTodos = [
  { id: todoID++, text: "Learn HTML", completed: false },
  { id: todoID++, text: "Learn CSS", completed: false },
  { id: todoID++, text: "Learn JavaScript", completed: false },
];
// Load Data
if (storedTodos) {
  TODOS = JSON.parse(storedTodos);
} else TODOS = exampleTodos;

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

const filterTodos = (completed) => {
  return TODOS.filter((todo) => todo.completed === completed);
};

// Event Handler Functions

const handleAddTodoClick = () => {
  let todo = getTodoFromInput();
  if (todo) {
    todo.id = todoID++;
    TODOS.push(todo);
    updateDOM();
  }
};

// Utility Functions

const getTodoFromInput = () => {
  let inputVal = todoInput.value;
  if (inputVal) {
    todoInput.value = "";
    console.log(`New todo added successfully!\n ${inputVal}`);
    return { text: `${inputVal}` }; // Don't increment todoID here
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
// Check which todos are checked and complete them when the button is clicked
completeTodoButton.addEventListener("click", () => {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      completeTodo(parseInt(checkbox.id));
    }
  }
});

activeTab.addEventListener("click", handleActiveTabClick);
completedTab.addEventListener("click", handleCompletedTabClick);

// Toast Message Function
const toast = (message) => {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
};
