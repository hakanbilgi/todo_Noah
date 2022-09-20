const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

renderSavedTodos();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("PLease enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };

    createListElement(newTodo);

    todos.push(newTodo);

    localStorage.setItem("TODOS", JSON.stringify(todos));
    todoInput.value = "";
  }
});

function createListElement(newTodo) {
  const { id, completed, text } = newTodo; //!destr.

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed && li.classList.add("checked");

  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  todoUl.appendChild(li);
}

todoUl.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();

    todos = todos.filter((todo) => todo.id !== Number(id));

    localStorage.setItem("TODOS", JSON.stringify(todos));
  } else if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
  }
});

todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

window.onload = function () {
  todoInput.focus();
};
