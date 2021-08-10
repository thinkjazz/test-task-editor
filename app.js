let taskInput = document.getElementById("new-task");
let taskText = document.getElementById("new-test-area");
let addButton = document.getElementsByTagName("button")[0];
let testTasksHolder = document.getElementById("test-tasks");


//Новый элемент списка задач
let createNewTestTaskElement = function (taskString, taskTextString) {
  //Создать элемент списка
  let listItem = document.createElement("li");
  //Cоздать span который будет потом скрыт
  let spanText = document.createElement("span");
  //Создать label
  let label = document.createElement("label");
  //Создать input (text)
  let editInput = document.createElement("input");
  //Создать textarea (text)
  let editTextArea = document.createElement("textarea");
  //Создать button.edit
  let editButton = document.createElement("button");
  //Создать button.delete
  let deleteButton = document.createElement("button");

  //Каждый элемент, требующий модификации 
  editInput.type = "text";
  editTextArea.name = "text-area";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  spanText.innerText = taskTextString;
  spanText.setAttribute("hidden", "");

  //Каждый элемент нуждается в добавлении
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(spanText);
  listItem.appendChild(editTextArea);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//Добавить новую тест задачу
let addTask = function () {
  console.log("Add task");
  // При нажатии кнопки
  // Создайте новый элемент списка с текстом из нового тест-задания
  let listItem = createNewTestTaskElement(taskInput.value, taskText.value);
 
  // Добавить listItem в testTasksHolder
  if (taskInput.value.length > 0 && taskText.value.length > 0) {
    testTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem);
    taskInput.value = "";
    taskText.value = "";

  }
};


// Редактирование существующей тест-задачи
let editTask = function () {
  console.log("Edit task");

  let listItem = this.parentNode;
  let editButton = this;
  let editInput = listItem.querySelector("input[type=text]");
  let editText = listItem.querySelector("textarea[name=text-area]");
  let label = listItem.querySelector("label");
  let spanText = listItem.querySelector("span");
  let containsClass = listItem.classList.contains("editMode");

  //Если класс родителя - .editMode
  if (containsClass) {
    //Переключаем из .editMode
    //Label text становится input's (text) value
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
    //Span text становится text-area's (text-area) value
    spanText.innerText = editText.value;

  } else {
    //Переключаем в .editMode
    //input (text) value становится label's text
    editInput.value = label.innerText;
    editButton.innerText = "Save";
    //textarea (text-area) value становится span text
    editText.value = spanText.innerText;
  }
  //Toggle Переключиться на .editMode в li
  listItem.classList.toggle("editMode");

};

// Удалить существующый тест таск
let deleteTask = function () {
  console.log("Delete task");
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Удаляем <li> из ul
  ul.removeChild(listItem);
};

// Пометить тест задачу как добавленую
let addedTestTask = function () {
  console.log("Test task done");
  // Добавьте тестовое задание li в #test-tasks
  let listItem = this.parentNode;
  testTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
};

let bindTaskEvents = function (taskListItem) {
  console.log("Bind list item events");
  // Выбираем дочерние элементы taskListItems
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

 //привязать editTask к кнопке редактирования
  editButton.onclick = editTask;

  //привязать deleteTask к кнопке удаления
  deleteButton.onclick = deleteTask;

};

//Установите обработчик щелчка на функцию addTask
addButton.addEventListener("click", addTask);


//перебор элементов списка testTasksHolder ul
for (let i = 0; i < testTasksHolder.children.length; i++) {
  //привязываем события к дочерним элементам списка  
  bindTaskEvents(testTasksHolder.children[i]);
}
