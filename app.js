// Variables
let input = document.getElementById("input-text");
let submitBtn = document.getElementById("addTask");
let taskCon = document.getElementById("taskCont");
// let allcheckbx = document.querySelectorAll(".check");
let Todo = JSON.parse(localStorage.getItem("todo")) || [];
let statsTotal = document.getElementById("Total");
let statsComP = document.getElementById("completed");
let statsRem = document.getElementById("remain");
let delAllBtn = document.getElementById("delallBtn");
// let deleteOne = document.getElementsByClassName("closeBtn");
document.addEventListener("DOMContentLoaded", () => {
  submitBtn.addEventListener("click", addTask);
  // allcheckbx.addEventListener("click",toggleChecked)
  taskCon.addEventListener("input", (e) => {
    let taskId = e.target.parentElement.parentElement.closest("div").id;
    // let trueOrfalse = e.hasAttribute("contenteditable");

    updateTask(taskId, e);
  });
  delAllBtn.addEventListener("click", deleteAll);
});

const addTask = () => {
  if (input.value == "") {
    alert("Please Enter Any TAsk!");
    return;
  }
  let data = {
    id: new Date().getTime(),
    name: input.value,
    Completed: false,
  };
  Todo.push(data);
  saveToLocalStorage();
  displayTasks();
  input.value = "";
  countstats();
};
const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(Todo));
  console.log("added to LS");
};

const displayTasks = () => {
  let output = "";
  Todo.forEach((curElem, index) => {
    output += `
     <div class="task ${curElem.Completed ? "completed" : ""}" id="${
      curElem.id
    }">
     <div>
     <input class="check " type="checkbox" ${
       curElem.Completed ? "checked" : ""
     }  >
     <p contenteditable="true" >${curElem.name}</p>
     </div>
     <p class="closeBtn" id="${index}" onclick="deleteOne(${index})">Close</p>
     </div>
     `;
  });
  taskCon.innerHTML = output;
};
displayTasks();

const deleteOne = (elem) => {
  Todo.splice(elem, 1);
  console.log(Todo);
  saveToLocalStorage();
  displayTasks();
  countstats();
};
function countstats() {
  statsTotal.textContent = Todo.length;
  taskCom = Todo.filter((task) => task.Completed == true);
  // statsCom = taskCom.length;
  statsComP.textContent = taskCom.length;
  statsRem.textContent = Todo.length - taskCom.length;
}
countstats();

const updateTask = (taskId, e) => {
  task = Todo.find((task) => task.id == taskId);
  let tagname = e.target.tagName;
  let inputParent = e.target.parentElement.parentElement;

  if (tagname == "P") {
    task.name = e.target.textContent;
  } else {
    task.Completed = !task.Completed;

    if (task.Completed) {
      inputParent.classList.add("completed");
    } else {
      inputParent.classList.remove("completed");
    }
  }
  saveToLocalStorage();
  countstats();
};

const deleteAll = () => {
  Todo = [];
  saveToLocalStorage();
  displayTasks();
  countstats();
};

// Js for Service Worker

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Says: Something Went Wrong");
      console.log(error);
    });
} else {
  alert("Offline Mode not Supported Error 303");
}
