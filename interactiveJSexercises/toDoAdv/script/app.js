// * VARIABLES FOR LIST BUILD

const addToDo = document.querySelector(".add-to-do > i.fa-solid.fa-plus");

const textToDo = document.querySelector(".add-to-do textarea#addToDo");

const toDosList = document.querySelector(".to-dos .to-dos-list");

// * VARIABLES FOR INFO MESSAGES

const footer = document.querySelector("footer");

const modalFooter = document.querySelector("footer section.message-modal");

const modalFooterMsg = document.querySelector("footer section.message-modal p");

// * Info Message Functions

const messageTypeLogger = (type) => {
  sessionStorage.setItem("infoType", type);
  sessionStorage.setItem("count", 1);
};

const toggleModal = () => {
  setTimeout(() => {
    footer.classList.toggle("hidden");
  }, 500);
};

const modalMessage = () => {
  const type = sessionStorage.getItem("infoType");
  let count = Number(sessionStorage.getItem("count"));
  if (type) {
    while (count < 2) {
      toggleModal();
      setTimeout(toggleModal, 1000);
      switch (type) {
        case "add":
          modalFooter.style.backgroundColor = "#bfd767fe";
          modalFooterMsg.innerText = "To-Do successfully added.";
          break;

        case "del":
          modalFooter.style.backgroundColor = "#be7e7efe";
          modalFooterMsg.innerText = "To-Do successfully deleted.";
          break;

        case "edit":
          modalFooter.style.backgroundColor = "#87a587fe";
          modalFooterMsg.innerText = "To-Do successfully edited.";
          break;

        case "done":
          modalFooter.style.backgroundColor = "#2ceebab3";
          modalFooterMsg.innerText = "Nice job!";
          break;

        default:
          break;
      }
      sessionStorage.removeItem("infoType");
      count++;
      sessionStorage.setItem("count", count);
    }
    sessionStorage.removeItem("count");
  }
};

modalMessage();
let idCounter = 0;
let isDone = false;
let localStorageLogs = [];

// Check if there is any data in local storage
if (localStorage.getItem("toDoLogs")) {
  localStorageLogs = JSON.parse(localStorage.getItem("toDoLogs"));
}
// console.log(localStorageLogs);
// console.log(localStorage.getItem("toDoLogs"));

const refresher = () => {
  setTimeout(window.location.reload(), 1000);
};

const getTime = () => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1; //months from 1-12
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const mins = dateObj.getMinutes();
  const secs = dateObj.getSeconds();
  const msecs = dateObj.getMilliseconds();

  const currentTime =
    year +
    "_" +
    month +
    "_" +
    day +
    "_" +
    hours +
    "_" +
    mins +
    "_" +
    secs +
    "_" +
    msecs;
  return currentTime;
};

const countObjectsInArray = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") {
      count++;
    }
  }
  return count;
};

const localObject = (index) => {
  index = index - 1 >= 0 ? index - 1 : 0;
  const logs = JSON.parse(localStorage.getItem("toDoLogs"));
  result = [];
  if (logs) {
    for (let key in logs[index]) {
      let value = logs[index][key];
      result.push(key);
      result.push(value);
    }
  }
  return result;
};

const logIdUpdater = () => {
  let tempArr = JSON.parse(localStorage.getItem("toDoLogs")) || [];
  let liItems = document.querySelectorAll(".to-dos-list li");
  let removedArr = tempArr.slice(); //copy the original tempArr

  //update key if li element's id changed
  liItems.forEach((li, index) => {
    let object = tempArr[index];
    let key = Object.keys(object)[0];
    let value = object[key];
    let newKey = key.replace(/li\d+/, `li${index + 1}`);
    //update key if it is different from li's id
    if (key !== newKey) {
      delete object[key];
      object[newKey] = value;
    }
    console.log(object);
    removedArr.splice(removedArr.indexOf(object), 1);
    console.log(removedArr);
  });

  //delete key if li element removed
  removedArr.forEach((removedObject) => {
    tempArr.splice(tempArr.indexOf(removedObject), 1);
    console.log(tempArr);
  });

  console.log(tempArr);
  localStorage.setItem("toDoLogs", JSON.stringify(tempArr));
};

const createNewKeyValue = (toDoItem, textarea, forID = false) => {
  if (forID) {
    // Read
    idCounter++;
    toDoItem.id = "li" + idCounter.toString();
  } else {
    // Write
    let newKey, newKeyValue;
    // Checking local storage keys
    if (localStorageLogs === []) {
      toDoItem.id = "li1";
      newKey = `to_do_${toDoItem.id}_` + getTime();
      newKeyValue = textarea.value;
    } else {
      keysCount = countObjectsInArray(localStorageLogs);
      toDoItem.id = "li" + (keysCount + 1).toString();
      newKeyValue = textarea.value;
      newKey = `to_do_${toDoItem.id}_` + getTime();
    }
    localStorageLogs.push({ [newKey]: newKeyValue });
    let jsonItems = JSON.stringify(localStorageLogs);
    localStorage.setItem("toDoLogs", jsonItems);
  }
};

const doneRestyle = (shift, box, check, text, pen) => {
  if (shift) {
    box.classList.toggle("hidden");
    check.classList.toggle("hidden");
    text.classList.toggle("done");
    pen.classList.toggle("hidden");
  }
};

const addToDoFunc = (text, readOnly = false) => {
  // Creating li item
  const toDoLi = document.createElement("li");
  toDoLi.classList.add("to-do-item");

  // Creating box icon for check mark inside li item
  const toDoLiCheckBox = document.createElement("i");
  toDoLiCheckBox.className = "fa-regular fa-square";
  toDoLi.appendChild(toDoLiCheckBox);

  // Creating check mark inside li item
  const toDoLiCheckMark = document.createElement("i");
  toDoLiCheckMark.className = "fa-solid fa-check-to-slot";
  toDoLiCheckMark.classList.add("hidden");
  toDoLi.appendChild(toDoLiCheckMark);

  // Creating textarea inside li item
  const toDoLiTextArea = document.createElement("textarea");
  toDoLiTextArea.id = "toDo"; // stylization from CSS
  toDoLiTextArea.value = text;
  toDoLiTextArea.disabled = true;
  toDoLiTextArea.style.height = textToDo.style.height;
  toDoLiTextArea.style.overflowY = textToDo.style.overflowY;
  toDoLi.appendChild(toDoLiTextArea);

  // Creating pen icon inside li item
  const toDoLiPen = document.createElement("i");
  toDoLiPen.classList = "fa-solid fa-pen";
  toDoLi.appendChild(toDoLiPen);

  // Creating edit approval icon inside li item
  const toDoLiPenApprove = document.createElement("i");
  toDoLiPenApprove.className = "fa-solid fa-check pen";
  toDoLiPenApprove.classList.add("hidden");
  toDoLi.appendChild(toDoLiPenApprove);

  // Creating edit denial icon inside li item
  const toDoLiPenNO = document.createElement("i");
  toDoLiPenNO.className = "fa-sharp fa-solid fa-square-xmark penNo";
  toDoLiPenNO.classList.add("hidden");
  toDoLi.appendChild(toDoLiPenNO);

  // Creating trash icon inside li item
  const toDoLiDel = document.createElement("i");
  toDoLiDel.classList = "fa-solid fa-trash";
  toDoLi.appendChild(toDoLiDel);

  // Creating trash approval icon inside li item
  const toDoLiDelOK = document.createElement("i");
  toDoLiDelOK.className = "fa-solid fa-check trash";
  toDoLiDelOK.classList.add("hidden");
  toDoLi.appendChild(toDoLiDelOK);

  // Creating trash denial icon inside li item
  const toDoLiDelNO = document.createElement("i");
  toDoLiDelNO.className = "fa-sharp fa-solid fa-square-xmark trashNo";
  toDoLiDelNO.classList.add("hidden");
  toDoLi.appendChild(toDoLiDelNO);

  doneRestyle(
    isDone,
    toDoLiCheckBox,
    toDoLiCheckMark,
    toDoLiTextArea,
    toDoLiPen
  );

  if (!readOnly) {
    createNewKeyValue(toDoLi, textToDo);
  } else {
    createNewKeyValue(toDoLi, textToDo, readOnly);
  }

  // Resetting input area
  textToDo.value = "";
  // Returning created to-do item
  return toDoLi;
};

const displayToDos = () => {
  const logs = JSON.parse(localStorage.getItem("toDoLogs"));
  if (logs) {
    for (let i in logs) {
      if (logs[i].hasOwnProperty("done")) {
        isDone = true;
      } else {
        isDone = false;
      }
      for (let key in logs[i]) {
        if (key !== "done") {
          let value = logs[i][key];
          toDosList.prepend(addToDoFunc(value, true));
        }
      }
    }
  }
};

// * Adding To-Do
addToDo.addEventListener("click", () => {
  if (textToDo.value == "") {
    alert("Type something first, try again.");
  } else {
    addToDoFunc(textToDo.value);
    messageTypeLogger("add");
    refresher();
  }
});

// * Displaying Stored To-Dos
displayToDos();

// Auto resizing textareas for multiline inputs
const textAreas = document.getElementsByTagName("textarea");
for (let i = 0; i < textAreas.length; i++) {
  // console.log(tx[i]);
  textAreas[i].setAttribute(
    "style",
    "height:" + textAreas[i].scrollHeight + "px;overflow-y:hidden;"
  );
  textAreas[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "3rem";
  this.style.height = this.scrollHeight + "px";
}

// * VARIABLES FOR LIST MUTATION
const doneToDoBefore = document.querySelectorAll(
  ".to-dos i.fa-regular.fa-square"
);
const doneToDoAfter = document.querySelectorAll(
  ".to-dos i.fa-solid.fa-check-to-slot"
);
const editToDo = document.querySelectorAll(".to-dos i.fa-solid.fa-pen");

const editToDoApprove = document.querySelectorAll(
  ".to-dos i.fa-solid.fa-check.pen"
);

const editToDoDeny = document.querySelectorAll(
  ".to-dos i.fa-sharp.fa-solid.fa-square-xmark.penNo"
);

const delToDo = document.querySelectorAll(".to-dos i.fa-solid.fa-trash");

const delApprove = document.querySelectorAll(
  ".to-dos i.fa-solid.fa-check.trash"
);

const delDeny = document.querySelectorAll(
  ".to-dos i.fa-solid.fa-square-xmark.trashNo"
);

// * Done Case
doneToDoBefore.forEach((box) => {
  box.addEventListener("click", (e) => {
    const boxParent = box.parentNode;
    const boxParentId = boxParent.id;
    const nestedTextArea = document.querySelector(`li#${boxParentId} textarea`);
    const nestedBoxCheck = document.querySelector(
      `li#${boxParentId} i.fa-solid.fa-check-to-slot.hidden`
    );
    const nestedEdit = document.querySelector(
      `li#${boxParentId} i.fa-solid.fa-pen`
    );
    nestedTextArea.classList.toggle("done");
    box.classList.toggle("hidden");
    nestedBoxCheck.classList.toggle("hidden");
    nestedEdit.classList.toggle("hidden");
    const regex = new RegExp(`${boxParentId}`);
    localStorageLogs.forEach((log, i) => {
      if (regex.test(Object.keys(log)[0])) {
        localStorageLogs[i]["done"] = "yes";
        console.log(localStorageLogs);
        console.log(localStorageLogs[i]);
      }
    });
    localStorage.setItem("toDoLogs", JSON.stringify(localStorageLogs));
    messageTypeLogger("done");
    modalMessage();
    // refresher();
  });
});

// * Reverting Done Case
doneToDoAfter.forEach((check) => {
  check.addEventListener("click", (e) => {
    const checkParent = check.parentNode;
    const checkParentId = checkParent.id;
    const nestedTextArea = document.querySelector(
      `li#${checkParentId} textarea`
    );
    const nestedBox = document.querySelector(
      `li#${checkParentId} i.fa-regular.fa-square.hidden`
    );
    const nestedEdit = document.querySelector(
      `li#${checkParentId} i.fa-solid.fa-pen.hidden`
    );
    nestedTextArea.classList.toggle("done");
    check.classList.toggle("hidden");
    nestedBox.classList.toggle("hidden");
    nestedEdit.classList.toggle("hidden");
    const regex = new RegExp(`${checkParentId}`);
    localStorageLogs.forEach((log, i) => {
      if (regex.test(Object.keys(log)[0])) {
        delete localStorageLogs[i]["done"];
      }
    });
    localStorage.setItem("toDoLogs", JSON.stringify(localStorageLogs));
  });
});

// * Edit Case
editToDo.forEach((edit) => {
  edit.addEventListener("click", (e) => {
    const editParent = edit.parentNode;
    const editParentId = editParent.id;
    const nestedTextArea = document.querySelector(
      `li#${editParentId} textarea`
    );
    const nestedEditOk = document.querySelector(
      `li#${editParentId} i.fa-solid.fa-check.pen`
    );
    const nestedEditNo = document.querySelector(
      `li#${editParentId} i.fa-sharp.fa-solid.fa-square-xmark.penNo`
    );
    const nestedTrash = document.querySelector(
      `li#${editParentId} i.fa-solid.fa-trash`
    );
    const nestedBox = document.querySelector(
      `li#${editParentId} i.fa-regular.fa-square`
    );
    edit.classList.toggle("hidden");
    nestedTrash.classList.toggle("hidden");
    nestedBox.classList.toggle("hidden");
    nestedEditOk.classList.toggle("hidden");
    nestedEditNo.classList.toggle("hidden");
    nestedTextArea.classList.toggle("edit");
    nestedTextArea.disabled = false;
  });
});

// * Edit Approval Case
editToDoApprove.forEach((editOk) => {
  editOk.addEventListener("click", (e) => {
    const editOkParent = editOk.parentNode;
    const editOkParentId = editOkParent.id;
    const nestedTextArea = document.querySelector(
      `li#${editOkParentId} textarea`
    );
    const nestedEdit = document.querySelector(
      `li#${editOkParentId} i.fa-solid.fa-pen`
    );
    const nestedEditNo = document.querySelector(
      `li#${editOkParentId} i.fa-sharp.fa-solid.fa-square-xmark.penNo`
    );
    const nestedTrash = document.querySelector(
      `li#${editOkParentId} i.fa-solid.fa-trash`
    );
    const nestedBox = document.querySelector(
      `li#${editOkParentId} i.fa-regular.fa-square.hidden`
    );
    editOk.classList.toggle("hidden");
    nestedEditNo.classList.toggle("hidden");
    nestedBox.classList.toggle("hidden");
    nestedTrash.classList.toggle("hidden");
    nestedEdit.classList.toggle("hidden");
    nestedTextArea.classList.toggle("edit");
    const regex = new RegExp(`${editOkParentId}`);
    localStorageLogs.forEach((log, i) => {
      if (regex.test(Object.keys(log)[0])) {
        log[Object.keys(log)[0]] = nestedTextArea.value;
      }
    });
    localStorage.setItem("toDoLogs", JSON.stringify(localStorageLogs));
    nestedTextArea.disabled = true;
    messageTypeLogger("edit");
    refresher();
  });
});

// * Edit Denial Case
editToDoDeny.forEach((editNo) => {
  editNo.addEventListener("click", (e) => {
    const editNoParent = editNo.parentNode;
    const editNoParentId = editNoParent.id;
    const nestedTextArea = document.querySelector(
      `li#${editNoParentId} textarea`
    );
    const nestedEdit = document.querySelector(
      `li#${editNoParentId} i.fa-solid.fa-pen`
    );
    const nestedEditOk = document.querySelector(
      `li#${editNoParentId} i.fa-solid.fa-check.pen`
    );
    const nestedTrash = document.querySelector(
      `li#${editNoParentId} i.fa-solid.fa-trash`
    );
    const nestedBox = document.querySelector(
      `li#${editNoParentId} i.fa-regular.fa-square.hidden`
    );
    editNo.classList.toggle("hidden");
    nestedEditOk.classList.toggle("hidden");
    nestedBox.classList.toggle("hidden");
    nestedTrash.classList.toggle("hidden");
    nestedEdit.classList.toggle("hidden");
    nestedTextArea.classList.toggle("edit");

    let index = 0;
    const regex = new RegExp(`${editNoParentId}`);
    localStorageLogs.forEach((log, i) => {
      if (regex.test(Object.keys(log)[0])) {
        index = i;
      }
    });
    nestedTextArea.value =
      localStorageLogs[index][Object.keys(localStorageLogs[index])[0]];
    nestedTextArea.disabled = true;
  });
});

// * Deleting Case
delToDo.forEach((del) => {
  del.addEventListener("click", (e) => {
    const delParent = del.parentNode;
    const delParentId = delParent.id;
    const nestedTextArea = document.querySelector(`li#${delParentId} textarea`);
    const nestedDelOk = document.querySelector(
      `li#${delParentId} i.fa-solid.fa-check.trash`
    );
    const nestedDelNo = document.querySelector(
      `li#${delParentId} i.fa-solid.fa-square-xmark.trashNo`
    );
    const nestedBox = document.querySelector(
      `li#${delParentId} i.fa-regular.fa-square`
    );
    const nestedBoxCheck = document.querySelector(
      `li#${delParentId} i.fa-solid.fa-check-to-slot`
    );
    const nestedEdit = document.querySelector(
      `li#${delParentId} i.fa-solid.fa-pen`
    );
    if (
      [...nestedBox.classList].includes("hidden") &&
      [...nestedEdit.classList].includes("hidden")
    ) {
      del.classList.toggle("hidden");
      nestedBoxCheck.classList.toggle("hidden");
      nestedDelOk.classList.toggle("hidden");
      nestedDelNo.classList.toggle("hidden");
      nestedTextArea.classList.toggle("del");
    } else {
      del.classList.toggle("hidden");
      nestedDelOk.classList.toggle("hidden");
      nestedDelNo.classList.toggle("hidden");
      nestedBox.classList.toggle("hidden");
      nestedEdit.classList.toggle("hidden");
      nestedTextArea.classList.toggle("del");
    }
  });
});

// * Deleting Approval Case
delApprove.forEach((delOk) => {
  delOk.addEventListener("click", (e) => {
    const delOkParent = delOk.parentNode;
    const delOkParentId = delOkParent.id;

    const tempArr = JSON.parse(localStorage.getItem("toDoLogs"));
    tempArr.splice(Number(delOkParentId[delOkParentId.length - 1]) - 1, 1);
    console.log(tempArr);
    const updatedArr = JSON.stringify(tempArr);
    console.log(updatedArr);
    localStorage.setItem("toDoLogs", updatedArr);
    toDosList.removeChild(delOkParent);
    messageTypeLogger("del");
    refresher();
    logIdUpdater();
  });
});

// * Deleting Denial Case
delDeny.forEach((delNo) => {
  delNo.addEventListener("click", (e) => {
    const delNoParent = delNo.parentNode;
    const delNoId = delNoParent.id;
    const nestedTextArea = document.querySelector(`li#${delNoId} textarea`);
    const nestedEdit = document.querySelector(
      `li#${delNoId} i.fa-solid.fa-pen`
    );
    const nestedDelOk = document.querySelector(
      `li#${delNoId} i.fa-solid.fa-check.trash`
    );
    const nestedTrash = document.querySelector(
      `li#${delNoId} i.fa-solid.fa-trash`
    );
    const nestedBox = document.querySelector(
      `li#${delNoId} i.fa-regular.fa-square.hidden`
    );

    if ([...nestedTextArea.classList].includes("done")) {
      nestedTextArea.classList.remove("done");
    }
    delNo.classList.toggle("hidden");
    nestedDelOk.classList.toggle("hidden");
    nestedBox.classList.toggle("hidden");
    nestedTrash.classList.toggle("hidden");
    nestedEdit.classList.toggle("hidden");
    nestedTextArea.classList.toggle("del");
  });
});
