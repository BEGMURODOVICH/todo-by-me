const todoInput = document.getElementById("todo-input");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.querySelector(".note-content");

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
  let minut = String(nowDate.getMinutes()).padStart(2, "0");
  let second = String(nowDate.getSeconds()).padStart(2, "0");
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  const formattedDate = `${dayName}, ${dayOfMonth}`;
  const formattedTime = `${hour}:${minut}:${second} ${ampm}`;
  document.querySelector(".week-day").textContent = formattedDate;
  document.querySelector(".time").textContent = formattedTime;
}
setInterval(updateTime, 1000);
updateTime();

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    if (!todo || !todo.title) return;

    const todoCard = document.createElement("li");
    todoCard.className = `todo-card ${todo.isCompleted ? "completed" : ""}`;
    todoCard.setAttribute("data-id", todo.id);
    // <button class="complete-btn"></button>

    todoCard.innerHTML = `
      <p>${todo.title}</p>
      <div class="action">
        <img class="edit-btn" src="img/edit.svg" alt="Edit" />
        <input type="checkbox" name="check" class="check" id="" />
        <img class="delete-btn" src="img/delet.svg" alt="Delete" />
      </div>
    `;

    todoList.appendChild(todoCard);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", editTodo);
  });
  document.querySelectorAll(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", toggleComplete);
  });
}

// function renderTodos() {
//   todoList.innerHTML = "";

//   todos.forEach((todo) => {
//     if (!todo || !todo.title) return;

//     const todoCard = document.createElement("li");
//     todoCard.className = `todo-card ${todo.isCompleted ? "completed" : ""}`;
//     todoCard.setAttribute("data-id", todo.id);

//     todoCard.innerHTML = `
//       <p>${todo.title}</p>
//       <div class="action">
//         <img class="edit-btn" src="img/edit.svg" alt="Edit" />
//         <button class="complete-btn"></button>
//         <img class="delete-btn" src="img/delet.svg" alt="Delete" />
//       </div>
//     `;

//     todoList.appendChild(todoCard);
//   });

//   document.querySelectorAll(".delete-btn").forEach((btn) => {
//     btn.addEventListener("click", deleteTodo);
//   });
//   document.querySelectorAll(".edit-btn").forEach((btn) => {
//     btn.addEventListener("click", editTodo);
//   });
//   document.querySelectorAll(".complete-btn").forEach((btn) => {
//     btn.addEventListener("click", toggleComplete);
//   });
// }

function deleteTodo() {
  const id = this.parentElement.parentElement.getAttribute("data-id");
  todos = todos.filter((todo) => todo.id !== Number(id));
  localStorage.setItem("todos", JSON.stringify(todos));
  showToastWithProgressNegative("Todo deleted!");
  renderTodos();
}

function editTodo() {
  showToastWithProgress("Todo edited!");
  const id = this.parentElement.parentElement.getAttribute("data-id");
  const todo = todos.find((todo) => todo && todo.id === Number(id));
  if (!todo) return;

  todoInput.value = todo.title;
  deleteTodo.call(this);
}

function toggleComplete() {
  const id = Number(this.parentElement.parentElement.getAttribute("data-id"));
  showToastWithProgressPositive("Todo Completed!");

  todos = todos.map((todo) => {
    if (todo && todo.id === id) {
      todo.isCompleted = !todo.isCompleted;

      const card = this.closest(".todo-card");
      card.classList.toggle("completeTodo");
    }
    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

let todos = (JSON.parse(localStorage.getItem("todos")) || []).filter(
  (todo) => todo && todo.title
);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

window.addEventListener("DOMContentLoaded", renderTodos);

function addTodo() {
  showToastWithProgressPositive("Todo added!");
  const title = todoInput.value.trim();
  if (!title) return;
  const newTodo = {
    id: Date.now(),
    title,
    isCompleted: false,
  };

  todos.push(newTodo);
  todoInput.value = "";
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
}

function showToastWithProgressPositive(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "10px";
  toast.style.background = "#4caf50";
  toast.style.color = "#fff";
  toast.style.padding = "10px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  toast.style.zIndex = "1000";
  toast.style.width = "250px";

  const progressBar = document.createElement("div");
  progressBar.style.height = "5px";
  progressBar.style.width = "100%";
  progressBar.style.background = "#ffffff";
  progressBar.style.borderRadius = "2px";
  progressBar.style.marginTop = "5px";
  progressBar.style.transition = "width 3s linear";
  toast.appendChild(progressBar);
  document.body.appendChild(toast);
  setTimeout(() => {
    progressBar.style.width = "0%";
  }, 0);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showToastWithProgressNegative(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "10px";
  toast.style.background = "red";
  toast.style.color = "#fff";
  toast.style.padding = "10px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  toast.style.zIndex = "1000";
  toast.style.width = "250px";

  const progressBar = document.createElement("div");
  progressBar.style.height = "5px";
  progressBar.style.width = "100%";
  progressBar.style.background = "#ffffff";
  progressBar.style.borderRadius = "2px";
  progressBar.style.marginTop = "5px";
  progressBar.style.transition = "width 3s linear";
  toast.appendChild(progressBar);
  document.body.appendChild(toast);
  setTimeout(() => {
    progressBar.style.width = "0%";
  }, 0);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
