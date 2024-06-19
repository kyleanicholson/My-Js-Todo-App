
// Query selectors

const storedTodos = localStorage.getItem("todos");
const todoContainer = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");




// Todo Data
let todos = []
if (storedTodos) {
  todos = JSON.parse(storedTodos);
} else {
  todos = [
    // Example data
    { text: "Eat breakfast" },
    { text: "Drink coffee" },
    { text: "Contemplate life decisions" },
  ];
}

// Functions
const buildTodoList = (todoList) => {
  todoContainer.innerHTML = "";
  for (let todo of todoList) {
    let li = createTodoElement(todo);
    li.classList.add("todo-item")
    todoContainer.appendChild(li);
  }
  localStorage.setItem("todos",JSON.stringify(todoList));
  

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

const createTodoElement = (todo) => {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(todo.text));
  return li;
};

buildTodoList(todos);

// Event Listeners

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let todo = getTodoFromInput();
    if (todo) {
      todos.push(todo);
      buildTodoList(todos);
    }
  }
});

addTodoButton.addEventListener("click", () => {
  let todo = getTodoFromInput();
  if (todo) {
    todos.push(todo);
    buildTodoList(todos);
  }
});
  



todoItems = document.querySelectorAll(".todo-item")
todoItems.forEach(todoItem => {
  todoItem.addEventListener("click", (e) => {
   
    let clickedTodo = e.target;
    if (clickedTodo.classList.contains('selected')){
      clickedTodo.classList.remove("selected")
    }
    else{
      clickedTodo.classList.add("selected");
    }
    
  });
});