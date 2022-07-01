const URL = "https://n36-todolist.herokuapp.com";
const template = document.querySelector(".todo-template").content;
const todoList = document.querySelector(".todo__list");
const newToDo = document.querySelector(".add-todo__input");
const newToDoForm = document.querySelector(".add-todo");
const Token = JSON.parse(localStorage.getItem("token"));

if (!localStorage.getItem("token")) {
  location.pathname = "auth.html";
}

async function getToDo() {
  const res = await fetch(`${URL}/todos`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Token,
    },
  });
  const data = await res.json();
  console.log(data);
  renderTodo(data);
}
getToDo();

async function addToDo() {
  const res = await fetch(`${URL}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Token,
    },
    body: JSON.stringify({
      text: newToDo.value.trim(),
    }),
  });
  getToDo();
}

newToDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addToDo();
  newToDo.value = "";
});

async function deleteToDo(idToDo) {
  const res = await fetch(`${URL}/todos/${idToDo}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      token: Token,
    },
  });
  getToDo();
}

async function editToDO(id) {
  const res = await fetch(`${URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      token: Token,
    },
  });
  getToDo();
}

todoList.addEventListener("click", (e) => {
  if (e.target.matches(".todo__btn")) {
    const currentItemId = e.target.closest(".todo__item").dataset.id;
    console.log(currentItemId);
    deleteToDo(currentItemId);
  } else if (e.target.matches(".todo__checkbox")) {
    const currentItemId = e.target.closest(".todo__item").dataset.id;
    console.log(currentItemId);
    editToDO(currentItemId);
  }
});

function renderTodo(toDoArr) {
  todoList.innerHTML = null;
  toDoArr.forEach((toDo) => {
    const newArr = template.cloneNode(true);
    newArr.querySelector(".todo__item").setAttribute("data-id", toDo.id);
    newArr.querySelector("#todotext").textContent = toDo.body;
    todoList.append(newArr);
  });
}
