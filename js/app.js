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

// LocalStorage-dan qaydlarni olish
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Hodisani qo'shish
submitBtn.addEventListener("click", addTodo);

// Sahifaga yuklashda mavjud qaydlarni render qilish
window.addEventListener("DOMContentLoaded", renderTodos);

function addTodo() {
  const title = todoInput.value.trim(); // Kiritilgan matn
  if (!title) return; // Bo'sh bo'lsa, hech narsa qilmaslik

  const newTodo = {
    id: Date.now(),
    title,
    isCompleted: false,
  };

  todos.push(newTodo); // Array-ga qo'shish
  localStorage.setItem("todos", JSON.stringify(todos)); // LocalStorage-ga saqlash
  todoInput.value = ""; // Inputni tozalash
  renderTodos(); // UI-ni yangilash
}

function renderTodos() {
  todoList.innerHTML = ""; // Avvalgi contentni tozalash

  todos.forEach((todo) => {
    const todoCard = document.createElement("li");
    todoCard.className = `todo-card ${todo.isCompleted ? "completed" : ""}`;
    todoCard.setAttribute("data-id", todo.id);

    todoCard.innerHTML = `
        <p>${todo.title}</p>
              <div class="action">
                <img class="edit-btn" src="img/edit.svg" alt="" />
                <div class="complete-btn chexbox"></div>
                <img class="delete-btn" src="img/delet.svg" alt="" />
              </div>
      `;

    todoList.appendChild(todoCard);
  });

  // Har bir tugma uchun event listener o'rnatish
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

function deleteTodo() {
  const id = this.parentElement.parentElement.getAttribute("data-id");
  todos = todos.filter((todo) => todo.id !== Number(id));
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
function editTodo() {
  const id = this.parentElement.parentElement.getAttribute("data-id");
  const todo = todos.find((todo) => todo.id === Number(id));

  todoInput.value = todo.title; // Eskisini inputga qo'yish
  deleteTodo.call(this); // Eskisini o'chirish
}
function toggleComplete() {
  const id = this.parentElement.parentElement.getAttribute("data-id");
  todos = todos.map((todo) => {
    if (todo.id === Number(id)) {
      todo.isCompleted = !todo.isCompleted;
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
