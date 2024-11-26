const todoInput = document.getElementById("todo-input");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.querySelector(".note-content");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

submitBtn.addEventListener("click", addTodo);
window.addEventListener("DOMContentLoaded", renderTodos);
function addTodo() {
  const todoTitle = todoInput.value.trim();
  if (!todoTitle) return;
  const newTodo = {
    id: Date.now(),
    todoTitle,
    isCompleted: false,
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //   todoInput = "";
  renderTodos();
}
function updateTime() {
  const nowDate = new Date();
  const days = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  const dayName = days[nowDate.getDay()];
  const dayOfMonth = nowDate.getDate();
  let hour = nowDate.getHours();
  let minut = nowDate.getMinutes();
  let second = nowDate.getSeconds();
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  const formattedDate = `${dayName} ${dayOfMonth}`;
  const formattedTime = `${hour}:${minut}:${second} ${ampm}`;
  document.querySelector(".week-day").textContent = formattedDate;
  document.querySelector(".time").textContent = formattedTime;
}
setInterval(updateTime, 1000);
updateTime();

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoCart = document.createElement("li");
    todoCart.setAttribute("data-id", todo.id);
    todoCart.innerHTML = `
     <p>${todo.todoTitle}</p>
              <div class="action">
                <img class="edit-btn" src="img/edit.svg" alt="" />
                <div class="complete-btn chexbox"></div>
                <img class="delete-btn" src="img/delet.svg" alt="" />
              </div>`;

    todoList.appendChild(todoCart);
  });
}

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", deleteTodo);
});

document.querySelectorAll(".edit-btn").forEach((btn) => {
  btn.addEventListener("click", editTodo);
});
document.querySelectorAll(".complete-btn").forEach((btn) => {
  btn.addEventListener("click", toggleComplete);
});
function deleteTodo() {
  const id = this.parentElement.parentElement.getAttribute("data-id");
  todos = todos.filter((todo) => todo.id !== Number(id));
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
function editTodo() {
  const id = this.parentElement.parentElement.getAttribute("data-id");
  const todoToEdit = todos.find((todo) => todo.id === Number(id));
  const inputField = document.querySelector("#todo-input");
  inputField.value = todoToEdit.title;
  document.querySelector("#submit-btn").onclick = function () {
    todoToEdit.title = inputField.value;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  };
}
addTodo();
