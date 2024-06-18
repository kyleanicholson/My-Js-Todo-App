const todos = [
  { text: "Eat breakfast" },
  { text: "Drink coffee" },
  { text: "Contemplate life decisions" },
];
const todoContainer = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");

const buildTodoList = (todoList) => {
  todoContainer.innerHTML = "";
  for (let todo of todoList) {
    let li = createTodoElement(todo);
    todoContainer.appendChild(li);
  }
};

const getTodoFromInput = () => {
  let inputVal = todoInput.value;
  if (inputVal) {
    console.log(`Input value of add todo ${inputVal}`);
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

addTodoButton.addEventListener("click", () => {
  let todo = getTodoFromInput();
  if (todo) {
    todos.push(todo);
    buildTodoList(todos);
  }
});

buildTodoList(todos);
