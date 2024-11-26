
const form = document.querySelector('#add-task');
const input = document.querySelector('#task-name');
const taskList = document.querySelector('#task-list');
// const resetList = document.querySelector('resetList');

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function crossOut(listItem) {
    const text = listItem.querySelector('span');
    const textDecoration = text.style.textDecoration;
    text.style.textDecoration = textDecoration === 'line-through' ? 'none' : 'line-through';
    saveTasks();
}


function addTaskButtons(newTask) {
    const completedBtn = document.createElement('button')
    completedBtn.innerText = 'Completed';
    completedBtn.addEventListener('click', function() {
        crossOut(newTask);
    });

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', function () {
        newTask.remove();
        saveTasks();
    });

    newTask.appendChild(completedBtn);
    newTask.appendChild(removeBtn);
};

function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => {
    const text = task.getElementsByTagName('span')[0].innerText;

        return {
            text: text,
            completed: task.style.textDecoration === 'line-through'
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            const newTask = document.createElement('li');
            const text = document.createElement('span');
            text.innerText = task.text;
            if (task.completed) {
                text.style.textDecoration = 'line-through';
            }
            newTask.appendChild(text);
            taskList.appendChild(newTask);
            addTaskButtons(newTask);
        });
    }
}

taskList.addEventListener('click', function(e){
    if(e.target.id) {
        const buttonId = e.target.id;
        if(buttonId === 'completed-btn'){
            crossOut(e.target.parentElement);
        }
        else if(buttonId === 'remove-btn'){
            e.target.parentElement.remove();
            saveTasks();
        }
    }
    else if(e.target.tagName === 'LI'){
        e.target.classList.toggle('todo');
        saveTasks();
    };
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newTask = document.createElement('li');
    const text = document.createElement('span');
    text.innerText = input.value;
    input.value = '';
    newTask.appendChild(text);
    taskList.appendChild(newTask);
    addTaskButtons(newTask);
    saveTasks();
});
