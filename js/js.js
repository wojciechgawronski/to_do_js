/**
 * select elements
 */

const clear = document.getElementById('clear');
const dateElement = document.getElementById('date')
const list = document.getElementById('list');
const trashList = document.getElementById('trash-list');
const input = document.getElementById('input');
const addButton = document.getElementById('add');

/**
 * CSS classes names
 */
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

/**
 * variables
 */
let LIST = [], id = 0;

/**
 * get item from localStorage
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
            addToDo(item.name, item.id, item.done, item.trash, item.time, item.completedTime);
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


function addToDo(toDo, id, done, trash, time, completedTime) {

      if (trash) { return; }

      const DONE = done ? CHECK : UNCHECK;
      const LINE = done ? LINE_THROUGH : "";
      const COMPLETED_TIME = completedTime ? " &rarr; " + completedTime : "";

      const item = `<li class="item">
      <i class="far ${DONE}" job='complete' completed='false' id=${id}></i>
      <div class='text'>
            <p class="text ${LINE}" id='list-item-${id}'>${toDo}</p> 
            <div id='textarea'></div>      
      </div>
      <div class="time">
            <span class="time">${time}</span>
            <span id='completed-time-${id}'> ${COMPLETED_TIME} </span>
      </div>
      <div class='right-section'>
            <i class="fas fa-pencil-alt" job='edit' id='${id}'></i>
            <i class="far fa-trash-alt" job='remove' id='${id}'></i>
      </div>

      </li>`;

      const position = "beforeend";
      list.insertAdjacentHTML(position, item);
}

/**
 * 
 */
function addElementToList() {
      const toDo = input.value;
      const nowTime = getTime();
      if (toDo) {
            addToDo(toDo, id, false, false, nowTime);
            LIST.push({
                  name: toDo,
                  id: id,
                  done: false,
                  trash: false,
                  time: nowTime,
                  completedTime: false
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

addButton.addEventListener('click', function () {
      addElementToList();
});

/**
 * aktualizacja widoku i LISTY w localStorage
 */
function completeToDo(element) {
      element.classList.toggle(CHECK);
      element.classList.toggle(UNCHECK);
      element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

      LIST[element.id].done = LIST[element.id].done ? false : true;

      // time
      changeCompletedTime(element);

      LIST[element.id].completedTime = LIST[element.id].completedTime ? false : getTime();
}


function removeToDo(element) {
      // element.parentNode.parentNode.parentNode.classList.add('remove');
      element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
      LIST[element.id].trash = true;
}

/**
 * target the items dynamicaly
 */
list.addEventListener("click", function (event) {
      // return the clicked element inside list
      const element = event.target;
      console.log(element);
      // complete or delete

      if (element.hasAttribute('job')) {


            const elementJob = event.target.attributes.job.value;

            if (elementJob == 'complete') {
                  completeToDo(element);
            }
            else if (elementJob == 'remove') {
                  removeToDo(element)
            }
            else if (elementJob == 'edit') {
                  editElement(element);
            }
            // else if (elementJob == 'changeElement') {
            // }


            //  add item to localstorage (this code must be adde where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
      }
});

const header = document.querySelector('header');
// header.style.backgroundImage = "url('img/night.jpg')"


/**
 * Edit function
 */
function editElement(element) {
      var IDNumber = element.id;
      id = 'list-item-' + IDNumber;
      var item = document.getElementById(id);
      let text = item.innerHTML;
      addTextarea(id, IDNumber, text, id);
}

/**
 * 
 * @param {*} id eg list-item-2
 * @param {*} IDNumber 2
 * @param {*} value 
 * @param {*} elementID 
 */
function addTextarea(id, IDNumber, value, elementID) {
      // http://jsfiddle.net/b0scgk1e/
      var textareaID = "textarea-" + id;
      const textara = document.getElementById(textareaID);

      if (!textara) {
            var breakNode = document.createElement("br");

            var input = document.createElement("textarea");
            input.id = textareaID;
            input.rows = "3";
            input.style.width = "100%";
            input.value = value;
            // input.onkeydown = tab(textareaID);

            var container = document.getElementById(id);
            container.appendChild(breakNode);
            container.appendChild(input);

            var btn = document.createElement("BUTTON");
            btn.innerHTML = "<i job='changeElement' class='fas fa-check btn btn-change'></i>";
            btn.classList = 'btn-change-item';
            btn.setAttribute("job", 'changeElement');
            // job
            // btn.onchange  = myFunction(IDNumber);
            btn.onclick = function () {
                  saveItem(IDNumber, textareaID, elementID);
                  return false;
            };
            container.appendChild(btn);

      }
}
function saveItem(IDnumber, textareaID, elementID) {
      var text = document.getElementById(textareaID).value;
      document.getElementById(elementID).innerHTML = text;

      LIST[IDnumber]['name'] = text;

      //  add item to localstorage (this code must be adde where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
};


const items = document.getElementsByClassName('text');
console.log(items);
for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function(element){
            // console.log(this.id);
            // editElement(element)
            // addTextarea();
      }, false);
}




/**
 *  Trash LIST functions
 */
const trash = document.getElementById('showTrash');
const closeTrashInfo = document.getElementById('close-trash-info');
var dataShow = false;
trash.addEventListener('click', function (el) {
      dataShow = el.currentTarget.getAttribute("data-show")
      if (dataShow == 'false') {
            el.currentTarget.setAttribute('data-show', 'true');
            // this.style.opacity = "1";
            this.innerHTML = '<i class="far fa-trash-alt"></i>';
            trashList.innerHTML = "";
      }
      else {
            // this.style.opacity = ".5";
            this.innerHTML = '<i class="fas fa-reply-all"></i>';
            el.currentTarget.setAttribute('data-show', 'false');
            lodadTrashList();

            // lodadTrashList(data);
      }
});

function lodadTrashList() {
      let data = localStorage.getItem("TODO");
      if (data) {

            LIST = JSON.parse(data);
            id = LIST.length;
            var countTrashElements = 0;
            LIST.forEach(function (item) {
                  if (item.trash == true) countTrashElements++;
                  addToTrashList(item.name, item.id, item.done, item.trash, item.time, item.completedTime);
            });
      }
      else {
            noTrashElements();
      }
      if (countTrashElements == 0) {
            noTrashElements();

      }
}

function noTrashElements() {
      item = `<li class="item item-trash">
                  <i><i class="fas fa-minus"></i></i>
                  <div class='text'>
                        <p class='text'>Brak elementów w koszu.</p>
                  </div>
                  <div class=""></div>
                  <div class='right-section'></div>
            </li>`;
      const position = "beforeend";
      trashList.insertAdjacentHTML(position, item);
}

function addToTrashList(toDo, id, done, trash, time, completedTime) {

      if (!trash) { return; }
      const COMPLETED_TIME = completedTime ? " &rarr; " + completedTime : "";

      const item =
            `<li class="item item-trash">
                  <i><i class="fas fa-minus"></i></i>
                  <div class='text'>
                        <p class='text'>${toDo}</p>
                  </div>
                  <div class="time">
                        <span class="time">${time}</span>
                        <span id='completed-time-${id}'> ${COMPLETED_TIME} </span>
                  </div>
                  <div class='right-section'></div>
            </li>`;
      const position = "beforeend";
      trashList.insertAdjacentHTML(position, item);
}

/**
 * time function 
 */
function changeCompletedTime(element) {

      var id = element.getAttribute('id');
      var spanID = "completed-time-" + id;
      completed = element.getAttribute('completed');
      const spanCompleted = document.getElementById(spanID);
      if (completed) {
            spanCompleted.innerHTML = "&rarr; " + getTime();
            element.setAttribute('completed', 'false');
      }
      else {
            element.setAttribute('completed', 'true');
            spanCompleted.innerHTML = "";
      }
}

function getTime() {

      var now = new Date();
      var month = now.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var day = now.getDate();
      if (day < 10) day = "0" + day;
      var h = now.getHours();
      var min = now.getMinutes();
      if (min < 10) min = "0" + min;
      var now = `${day}.${month}, ${h}:${min}`;
      return now;
}

/**
 * mode functions
 */
const mode = document.getElementById('mode');
mode.addEventListener('click', function (el) {
      dataMode = el.currentTarget.getAttribute("data-mode")
      var white = "#fff";
      var lightgray = "#f4f4f4";
      var dark = "#222";
      const header = document.getElementById('header');
      if (dataMode == 'dark') {
            el.currentTarget.setAttribute('data-mode', 'light');
            this.innerHTML = '<i class="fas fa-sun"></i>';

            document.body.style.backgroundColor = dark;
            document.body.style.color = lightgray;
            input.style.backgroundColor = dark;
            input.style.color = lightgray;
            header.style.backgroundImage = "url('img/night3.jpg')"
      }
      else {
            this.innerHTML = '<i class="far fa-moon"></i>';
            el.currentTarget.setAttribute('data-mode', 'dark');

            document.body.style.backgroundColor = white;
            document.body.style.color = dark;
            input.style.backgroundColor = white;
            input.style.color = dark;
            header.style.backgroundImage = "url('img/night2.jpg')"

      }
});


/**
 * Clear storage function
 */
// var clearLocal = false;
// if (clearLocal) {
// }

var clerLocalStorage = document.getElementById('clerLocalStorage');

// console.log(clerLocalStorage.checked);

// var clearLocal;
clerLocalStorage.addEventListener('click', function (e) {
      // console.log(this.checked);
      var checked = this.checked;
      clearLocal = checked;

      if (clearLocal) {
            // console.log(e);
            window.onbeforeunload = function (e) {
                  window.onunload = function () {
                        localStorage.clear();
                  }
                  return;
            };
      }
});




// localStorage.setItem('TODO', )

// let data = localStorage.getItem("TODO");
// LIST = JSON.parse(data);
// localStorage.setItem('TODO', LIST[0]['name'] = 'x');
// console.log(LIST);
// console.log(typeof(LIST[0]['name']));
// LIST[0]['name'] = 'a';
// localStorage.setItem('TODO')
console.log(LIST[0]['name']);




