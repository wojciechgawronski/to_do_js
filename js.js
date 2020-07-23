/**
 * select elements
 */

const clear = document.getElementById('clear');
const dateElement = document.getElementById('date')
const list = document.getElementById('list');
const input = document.getElementById('input');
const addButton = document.getElementById('add');

/**
 * classes names
 */
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

/**
 * variables
 */
let LIST = [], id = 0;

/**
 * get iotem from localStorage
 */
let data = localStorage.getItem("TODO");

/**
 * check data is not empty
 */
if (data) {
      LIST = JSON.parse(data);
      id = LIST.length;
      // load list to user interface
      loadList(LIST);
}
else {
      LIST = [];
      id = 0;
}

// load items to user interface
function loadList(array) {
      array.forEach(function (item) {
            addToDo(item.name, item.id, item.done, item.traah);
      });
}

/**
 * clear the local Storage
 */
clear.addEventListener('click', function () {
      localStorage.clear();
      location.reload();
});

/** 
 * Date
 */
let today = new Date();
const options = { weekday: 'long', month: 'short', day: 'numeric' }
dateElement.innerHTML = today.toLocaleDateString("pl-PL", options);


function addToDo(toDo, id, done, trash) {

      if (trash) { return; }

      const DONE = done ? CHECK : UNCHECK;
      const LINE = done ? LINE_THROUGH : "";

      const item = `<li class="item">
      <i class="far ${DONE}" job='complete' id=${id}></i>
      <p class="text ${LINE}">${toDo}</p> 
      <i class="far fa-trash-alt" job='remove' id=${id}></i>
      </li>`;

      const position = "beforeend";
      list.insertAdjacentHTML(position, item);
}

function addElementToList() {
      const toDo = input.value;
      if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                  name: toDo,
                  id: id,
                  done: false,
                  trash: false
            });

            //  add item to localstorage (this code must be adde where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
      }
      input.value = '';
}

document.addEventListener('keyup', function (event) {
      if (event.keyCode == 13) {
            addElementToList();
      }
});

addButton.addEventListener('click', function(){
      addElementToList();
});

// addToDo('coff', 2, true, false);


function completeToDo(element) {
      element.classList.toggle(CHECK);
      element.classList.toggle(UNCHECK);
      element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

      LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element) {
      element.parentNode.parentNode.removeChild(element.parentNode);
      LIST[element.id].trash = true;
}


/**
 * target the items dynamicaly
 */
list.addEventListener("click", function (event) {
      // return the clicked element inside list
      const element = event.target;
      // complete or delete
      const elementJob = event.target.attributes.job.value;

      if (elementJob == 'complete') {
            completeToDo(element);
      }
      else if (elementJob == 'remove') {
            removeToDo(element)
      }

      //  add item to localstorage (this code must be adde where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

});

