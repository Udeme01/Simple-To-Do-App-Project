// CODE ALONG FROM THE COURSE....


// Define UI Variables...
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// Load all event listeners...
function loadEventListeners() {
    // DOM Content Loaded event...
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task...
    form.addEventListener('submit', addTask);

    // Remove Task...
    taskList.addEventListener('click', removeTask);

    // Clear task...
    clearBtn.addEventListener('click', clearTask);

    // filter tasks
    filter.addEventListener('keyup', filterTasks);
};
loadEventListeners();


// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// Add Task...
function addTask(e) {
    if (taskInput.value === '') {
        alert('Oga Add Task Jare 😂');
    } else {
        // create li element...
        const li = document.createElement('li');

        // Add class...
        li.className = 'collection-item';

        // create textNode and append to li...
        li.appendChild(document.createTextNode(taskInput.value));

        // create link element...
        const link = document.createElement('a');

        // Add Class...
        link.className = 'delete-item secondary-content';

        // set link attribute...
        link.setAttribute('href', '#');

        // Add icon HTML...
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append link to li...
        li.appendChild(link);

        // Append li to ul.collection...
        taskList.appendChild(li);
    }

    // Store in Local Storage...
    storeTaskInLocalStorage(taskInput.value);

    // // clear task input...
    taskInput.value = '';

    e.preventDefault();
};

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// getTasks
function getTasks(task) {
    let tasksAdded;
    if (localStorage.getItem('tasksAdded') === null) {
        tasksAdded = [];
    } else {
        tasksAdded = JSON.parse(localStorage.getItem('tasksAdded'));
    }

    tasksAdded.forEach(function (task) {
        // create li element...
        const li = document.createElement('li');

        // Add class...
        li.className = 'collection-item';

        // create textNode and append to li...
        li.appendChild(document.createTextNode(task));

        // create link element...
        const link = document.createElement('a');

        // Add Class...
        link.className = 'delete-item secondary-content';

        // set link attribute...
        link.setAttribute('href', '#');

        // Add icon HTML...
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append link to li...
        li.appendChild(link);

        // Append li to ul.collection...
        taskList.appendChild(li);
    });
}

// *
// *
// *
// *
// *
// store into local storage.
function storeTaskInLocalStorage(task) {
    let tasksAdded;
    if (localStorage.getItem('tasksAdded') === null) {
        tasksAdded = [];
    } else {
        tasksAdded = JSON.parse(localStorage.getItem('tasksAdded'));
    };

    tasksAdded.push(task);
    localStorage.setItem('tasksAdded', JSON.stringify(tasksAdded));
};

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// REMOVE TASK...
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('You sure for this thing wey you wan do so???')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS...
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

// REMOVE FROM LS.
function removeTaskFromLocalStorage(taskItem) {
    let tasksAdded;
    if (localStorage.getItem('tasksAdded') === null) {
        tasksAdded = [];
    } else {
        tasksAdded = JSON.parse(localStorage.getItem('tasksAdded'));
    };

    // Looping through...
    tasksAdded.forEach(function (taskIt, index) {
        if (taskItem.textContent === taskIt) {
            tasksAdded.splice(index, 1);
        }
    });

    localStorage.setItem("tasksAdded", JSON.stringify(tasksAdded));
}
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// CLEAR TASK... METHOD 1...
function clearTask(e) {
    // if (confirm('Are you sure???')) {
    //     taskList.innerHTML = '';
    // };

    // Method 2... Faster. 
    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        };
    };
    e.preventDefault();

    // clear task func...
    clearTaskFromLocalStorage();

    // clear Task from LS
    function clearTaskFromLocalStorage() {
        localStorage.clear();
    }
};

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// FILTER TASKS....
function filterTasks(e) {
    const textOutput = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        // if there is no match, it's gonna equal negative one[-1], if there's a match, it's gonna equal positive one [+1];
        if (item.toLowerCase().indexOf(textOutput) != -1) {
            // so here it says, if it doesn't equal negative one [-1], i.e. if there's a match, run the code below...
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        };
    });
};