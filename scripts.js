
const storedTodos = localStorage.getItem("todos");
const todoContainer = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");

// Load Data (if it exists)
let TODOS = []; // init global state 
if (storedTodos) {
  TODOS = JSON.parse(storedTodos);
}
else {
  TODOS = [
    { text: "Buy milk" },
    { text: "Do laundry" },
    { text: "Clean the house" },
  ];
}

// Functions

const createTodoElement = (todo) => {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(todo.text));
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
  todoContainer.innerHTML = "";
  buildTodoList(TODOS);
};


const getTodoFromInput = () => {
  let inputVal = todoInput.value;
  if (inputVal) {
    console.log(`Input value of add todo ${inputVal}`);
    todoInput.value = "";
    return { text: `${inputVal}` };
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
  if (e.key === "Enter") {
    let todo = getTodoFromInput();
    if (todo) {
      TODOS.push(todo); // Update the global state
      localStorage.setItem("todos", JSON.stringify(TODOS));
      updateDOM();
    }
  }
});

addTodoButton.addEventListener("click", () => {
  let todo = getTodoFromInput(); // get the new data
  if (todo) {
    TODOS.push(todo); // Update the global state
    localStorage.setItem("todos", JSON.stringify(TODOS))
    updateDOM();
  }
});

todoElements = document.querySelectorAll(".todo-item");
todoElements.forEach((todoElement) => {
  todoElement.addEventListener("click", (e) => {
    let clickedTodo = e.target;
    if (clickedTodo.classList.contains("selected")) {
      clickedTodo.classList.remove("selected");
    } else {
      clickedTodo.classList.add("selected");
    }
  });
});
