// const todoItems= [];

// const form = document.querySelector('.js-form');
// form.addEventListener('submit', (event) =>{
//     event.preventDefault();

//     const input = document .querySelector('.js-todo-input');
//     const text = input.value.trim();
//     if(text !== ""){
//         const todo ={
//             text: text,
//             checked:false,
//             id: Date.now(),
//         };

//         todoItems.push(todo);
//         input.value = "";
//         renderTodo();

//     // console.log(todoItems);

//     }
// });

// function renderTodo(todo){
//     const list = document.querySelector('.js-todo-list');
//     const isChecked = todo.checked ? 'done' : '';
//     const node = document.createElement('li');
//     node.setAttribute('class',`todo-item ${isChecked}`);
//     node.setAttribute('data-key', todo.id);
//     node.innerHTML = ` 
//     <input id="${todo.id}" type="checkbox"/>
//     <label for="${todo.id}" class="tick js-tick"></label>
//     <span>${todo.text}</span>
//     <button class="delete-todo js-delete-todo">
//     <svg>
//     <use href="#delete-icon"></use>
//     </svg>
//     </button>
//     ` ;
//     list.append(node);
// }

// MIO 



//  BT ` 


// manuel
let todoItems = [];
const form = document.querySelector(".js-form");
const list = document.querySelector(".js-todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");
  const text = input.value.trim();
  if (text !== "") {
    const todo = {
      text: text,
      checked: false,
      id: Date.now(),
    };
    todoItems.push(todo);
    input.value = "";
    renderTodo(todo);
  }
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

function renderTodo(todo) {
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) {
      list.innerHTML = "";
    }
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
  <input id="${todo.id}" type="checkbox" />
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  <svg><use href="#delete-icon"></use></svg>
  </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}