// CODED MYSELF BUH CHECK THE COURSE A li'l...

//define variable in UI
const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

// create a function that loads all the events
function loadAllEventListeners() {
    // DOM Content Load Event
    document.addEventListener('DOMContentLoaded', reAddTasks);
    // Add Task Event
    form.addEventListener('submit', addTask);

    // Remove Task Event
    taskList.addEventListener('click', removeTask);

    // Clear Task
    clearBtn.addEventListener('click', clearTask);

    // filter task
    filter.addEventListener('keyup', filterTask);
};
loadAllEventListeners();



// create a function for addTask() event...
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add Task');
    } else {
        // create task element...
        const li = document.createElement('li');

        // give created element(li) a className...
        li.className = 'collection-item';

        // create a textNode for the created element(li)...
        li.appendChild(document.createTextNode(taskInput.value.toLowerCase()));

        // create a link inside the li
        const link = document.createElement('a');

        // create classNames for link
        link.className = 'delete-item secondary-content';

        // set Attribute for link
        link.setAttribute('href', '#');

        // create innerHTML Tag
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append link into li
        li.appendChild(link);

        // append the created element(li) into it's parent element(ul.collection)...
        taskList.appendChild(li);

        addToLocalStorage(taskInput.value);

        // clear taskInput field
        taskInput.value = '';

    }
    e.preventDefault();
};

// Re-Add Task from Local Storage...
function reAddTasks() {
    let taskArr;

    if (localStorage.getItem('taskArr') === null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(localStorage.getItem('taskArr'));
    };

    // Loop through what's in your Local Storage to reflect it in the UI...
    taskArr.forEach(function (tasksArr) {
        // create task element...
        const li = document.createElement('li');

        // give created element(li) a className...
        li.className = 'collection-item';

        // create a textNode for the created element(li)...
        li.appendChild(document.createTextNode(tasksArr.toLowerCase()));

        // create a link inside the li
        const link = document.createElement('a');

        // create classNames for link
        link.className = 'delete-item secondary-content';

        // set Attribute for link
        link.setAttribute('href', '#');

        // create innerHTML Tag
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append link into li
        li.appendChild(link);

        // append the created element(li) into it's parent element(ul.collection)...
        taskList.appendChild(li);
    });
}


// remove task...
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure')) {
            e.target.parentElement.parentElement.remove();
        };
    };

    // remove Task from Local Storage...
    removeFromLocalStorage(e.target.parentElement.parentElement);
};

// remove task from Local Storage
function removeFromLocalStorage(taskContentUI) {
    let taskArr;

    if (localStorage.getItem('taskArr') === null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(localStorage.getItem('taskArr'));
    };

    taskArr.forEach(function (TaskFromLS, index) {
        if (taskContentUI.textContent === TaskFromLS) {
            taskArr.splice(index, 1);
        }
    });

    localStorage.setItem('taskArr', JSON.stringify(taskArr))
};

// clear task
function clearTask(e) {
    // // Method 1
    // if (confirm('clear task?')) {
    //     taskList.innerHTML = '';
    // };

    // Method 2
    if (confirm('clear tasl?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        };
    };
    e.preventDefault();

    // clear Local Storage Task...
    clearLSTasks();

    // clear LS Task Function
    function clearLSTasks() {
        localStorage.clear();
    }
};

// Filter Task
function filterTask(e) {
    const listSearch = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.collection-item');

    listItems.forEach(function (listItem) {
        const listContent = listItem.firstChild.textContent;
        if (listContent.toLowerCase().indexOf(listSearch) != -1) {
            listItem.style.display = 'block';
        } else {
            listItem.style.display = 'none';
        };
    });
};

// add task lists to local storage
function addToLocalStorage(taskVal) {
    let taskArr;

    if (localStorage.getItem('taskArr') === null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(localStorage.getItem('taskArr'));
    };

    taskArr.push(taskVal);
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
};