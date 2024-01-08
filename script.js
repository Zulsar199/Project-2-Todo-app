let idCounter = 1;
let mainArray = [];

const show = (status) => {
  document.getElementById("title-input").value = "";
  document.getElementById("description-input").value = "";
  document.getElementById("status-select").value = status;

  document.getElementById("action-name").innerHTML = "Add task";
  document.getElementById("task-id").innerHTML = "";
  document
    .getElementsByClassName("editTaskButton")[0]
    .classList.add("display-none");
  document
    .getElementsByClassName("addTaskButton")[0]
    .classList.remove("display-none");

  document.getElementsByClassName("addTask-container")[0].classList.add("flex");
};

const hide = () => {
  document.getElementById("title-input").style.borderColor = "lightgrey";
  document.getElementById("description-input").style.borderColor = "lightgrey";
  document.getElementById("title-input").placeholder = "";
  document.getElementById("description-input").placeholder = "";
  document
    .getElementsByClassName("addTask-container")[0]
    .classList.remove("flex");
};

const addTask = () => {
  const titleInputValue = document.getElementById("title-input").value;
  const descriptionInputValue =
    document.getElementById("description-input").value;

  if (titleInputValue.trim() === "" && descriptionInputValue.trim() === "") {
    document.getElementById("title-input").style.borderColor = "red";
    document.getElementById("description-input").style.borderColor = "red";
    document.getElementById("title-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    document.getElementById("description-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    return;
  } else if (titleInputValue.trim() === "") {
    document.getElementById("title-input").style.borderColor = "red";
    document.getElementById("title-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    return;
  } else if (descriptionInputValue.trim() === "") {
    document.getElementById("description-input").style.borderColor = "red";
    document.getElementById("description-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    return;
  }
  const statusInputValue = document.getElementById("status-select").value;
  const priorityInputValue = document.getElementById("priority-select").value;
  const inputObj = {
    title: titleInputValue,
    description: descriptionInputValue,
    status: statusInputValue,
    priority: priorityInputValue,
    id: idCounter++,
  };
  mainArray.push(inputObj);
  renderAllBoxes();
  hide();
};

const generateHtml = (boxArray) => {
  // Sort by priority: high, medium, low
  boxArray.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  let boxString = "";
  boxArray.forEach((el) => {
    console.log("testing boxid = ", el.id);

    boxString += `<div ondragstart="drag(event)" class="addTask" draggable="true" id=${el.id}>
      <div onclick="doneTask(${el.id})" class="done">
        <i class="fa-solid fa-check"></i>
      </div>
      <div class="details">
        <h4>${el.title}</h4>
        <p>${el.description}</p>
        <div class="priority">${el.priority}</div>
      </div>
      <div  class="action ">
        <div onclick="deleteTask(${el.id})" class="delete"><i class="fa-solid fa-trash"></i></div>
        <div onclick="editTask(${el.id})" class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
      </div>
    </div>
    `;
  });
  return boxString;
};
const renderAllBoxes = () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    const status = box.querySelector(".box-header").textContent.trim();
    const filteredArray = mainArray.filter((el) => el.status === status);
    // task counter
    box.querySelector(".task-counter").innerHTML =
      filteredArray != null ? filteredArray.length : "0";

    let boxString = generateHtml(filteredArray);

    switch (status) {
      case "To do":
        box.querySelector(".box-main-todo").innerHTML = boxString;
        break;
      case "In progress":
        box.querySelector(".box-main-inProgress").innerHTML = boxString;
        break;
      case "Stuck":
        box.querySelector(".box-main-stuck").innerHTML = boxString;
        break;
      case "Done":
        box.querySelector(".box-main-done").innerHTML = boxString;
        break;
      default:
        break;
    }
  });
};
const allowDrop = (event) => {
  event.preventDefault();
};

const drag = (event) => {
  event.dataTransfer.setData("text", event.target.id);
};

const drop = (event) => {
  event.preventDefault();
  const boxId = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(boxId);
  const target = event.target.closest(".box");
  if (target) {
    const newStatus = target.querySelector(".box-header").textContent.trim();
    const taskId = parseInt(draggedElement.id); // Get the ID of the dropped element
    const foundTask = mainArray.find((task) => task.id === taskId);
    if (foundTask) {
      foundTask.status = newStatus;
    }

    renderAllBoxes();
  }
};

function deleteTask(id) {
  const index = mainArray.findIndex((task) => task.id === id);
  if (index !== -1) {
    mainArray.splice(index, 1);
  }

  renderAllBoxes();
}

function doneTask(id) {
  mainArray.forEach((el) => {
    if (el.id === id) {
      el.status = "Done";
    }
  });

  renderAllBoxes();
}

function editTask(id) {
  mainArray.forEach((el) => {
    if (el.id === id) {
      document.getElementById("title-input").value = el.title;
      document.getElementById("description-input").value = el.description;
      document.getElementById("status-select").value = el.status;
      document.getElementById("priority-select").value = el.priority;
      document.getElementById("action-name").innerHTML = "Edit task";
      document.getElementById("task-id").innerHTML = el.id;

      return;
    }
  });

  document
    .getElementsByClassName("addTaskButton")[0]
    .classList.add("display-none");
  document
    .getElementsByClassName("editTaskButton")[0]
    .classList.remove("display-none");
  document.getElementsByClassName("addTask-container")[0].classList.add("flex");
}

function saveEdit() {
  const taskId = document.getElementById("task-id").innerHTML;

  const titleInputValue = document.getElementById("title-input").value;
  const descriptionInputValue =
    document.getElementById("description-input").value;

  if (titleInputValue.trim() === "" && descriptionInputValue.trim() === "") {
    document.getElementById("title-input").style.borderColor = "red";
    document.getElementById("description-input").style.borderColor = "red";
    document.getElementById("title-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    document.getElementById("description-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    return;
  } else if (titleInputValue.trim() === "") {
    document.getElementById("title-input").style.borderColor = "red";
    document.getElementById("title-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    return;
  } else if (descriptionInputValue.trim() === "") {
    document.getElementById("description-input").style.borderColor = "red";
    document.getElementById("description-input").placeholder =
      "Хоосон утгыг бөглөнө үү";
    return;
  }
  mainArray.forEach((el) => {
    if (el.id == taskId) {
      const titleInputValue = document.getElementById("title-input").value;
      const descriptionInputValue =
        document.getElementById("description-input").value;
      const statusInputValue = document.getElementById("status-select").value;
      const priorityInputValue =
        document.getElementById("priority-select").value;

      el.title = titleInputValue;
      el.description = descriptionInputValue;
      el.status = statusInputValue;
      el.priority = priorityInputValue;

      return;
    }
  });

  renderAllBoxes();
  hide();
}
//todo nemeh
// const render = (statusInputValue) => {
//   const filteredArray = mainArray.filter((el) => {
//     return el.status === statusInputValue;
//   });

//   let boxString = generateHtml(filteredArray);

//   switch (statusInputValue) {
//     case "To do":
//       document.getElementsByClassName("box-main-todo")[0].innerHTML = boxString;
//       break;

//     case "In progress":
//       document.getElementsByClassName("box-main-inProgress")[0].innerHTML =
//         boxString;
//       break;

//     case "Stuck":
//       document.getElementsByClassName("box-main-stuck")[0].innerHTML =
//         boxString;
//       break;

//     case "Done":
//       document.getElementsByClassName("box-main-done")[0].innerHTML = boxString;
//       break;

//     default:
//       break;
//   }
// };
