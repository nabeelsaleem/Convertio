// --- TYPE DEFINITIONS ---
type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

type Filter = 'all' | 'active' | 'completed';

// --- STATE ---
let tasks: Task[] = [];
let currentFilter: Filter = 'all';

// --- DOM ELEMENTS ---
const dom = {
  addTaskForm: document.getElementById('add-task-form') as HTMLFormElement,
  taskInput: document.getElementById('task-input') as HTMLInputElement,
  taskList: document.getElementById('task-list') as HTMLUListElement,
  taskItemTemplate: document.getElementById('task-item-template') as HTMLTemplateElement,
  filters: document.getElementById('filters') as HTMLDivElement,
  clearCompletedBtn: document.getElementById('clear-completed-btn') as HTMLButtonElement,
  emptyState: document.getElementById('empty-state') as HTMLDivElement,
  emptyStateMessage: document.getElementById('empty-state-message') as HTMLParagraphElement,
};

// --- DATA PERSISTENCE ---
const saveTasks = () => {
  try {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error("Could not save tasks to localStorage", error);
  }
};

const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }
  } catch (error) {
    console.error("Could not load tasks from localStorage", error);
    tasks = [];
  }
};

// --- CORE LOGIC ---
const renderTasks = () => {
  // Clear current list
  dom.taskList.innerHTML = '';

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Handle empty state
  if (filteredTasks.length === 0) {
    dom.emptyState.classList.remove('hidden');
    switch (currentFilter) {
      case 'all':
        dom.emptyStateMessage.textContent = 'Add a task to get started!';
        break;
      case 'active':
        dom.emptyStateMessage.textContent = 'No active tasks. Great job!';
        break;
      case 'completed':
        dom.emptyStateMessage.textContent = 'No tasks completed yet.';
        break;
    }
  } else {
    dom.emptyState.classList.add('hidden');
  }

  // Render tasks
  filteredTasks
    .sort((a, b) => a.createdAt - b.createdAt) // Show oldest first
    .forEach(task => {
      const taskElement = document.importNode(dom.taskItemTemplate.content, true);
      const listItem = taskElement.querySelector('.task-item') as HTMLLIElement;
      const checkbox = taskElement.querySelector('.task-checkbox') as HTMLInputElement;
      const textSpan = taskElement.querySelector('.task-text') as HTMLSpanElement;

      listItem.dataset.id = task.id.toString();
      listItem.classList.add('group');
      textSpan.textContent = task.text;
      checkbox.checked = task.completed;
      
      if (task.completed) {
        listItem.classList.add('opacity-60');
        textSpan.classList.add('line-through', 'text-slate-500');
        checkbox.classList.add('bg-primary');
      } else {
        checkbox.classList.remove('bg-primary');
      }

      dom.taskList.appendChild(taskElement);
    });
    
    updateControls();
};

const addTask = (text: string) => {
  if (!text.trim()) return;

  const newTask: Task = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
};

const toggleTask = (id: number) => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
};

const deleteTask = (id: number) => {
    const taskItem = dom.taskList.querySelector(`[data-id='${id}']`);
    if (taskItem) {
        taskItem.classList.add('animate-fade-out');
        taskItem.addEventListener('animationend', () => {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
        }, { once: true });
    } else {
        // Fallback if animation fails
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
};

const clearCompletedTasks = () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
};

const updateControls = () => {
  // Update filter buttons
  const filterButtons = dom.filters.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    if (button.getAttribute('data-filter') === currentFilter) {
      button.classList.add('bg-primary/10', 'text-primary');
      button.classList.remove('text-slate-500');
    } else {
      button.classList.remove('bg-primary/10', 'text-primary');
      button.classList.add('text-slate-500', 'hover:bg-slate-200');
    }
  });

  // Update clear completed button
  const hasCompletedTasks = tasks.some(task => task.completed);
  dom.clearCompletedBtn.classList.toggle('hidden', !hasCompletedTasks);
};

// --- EVENT LISTENERS ---
const setupEventListeners = () => {
  // Add task
  dom.addTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    addTask(dom.taskInput.value);
    dom.taskInput.value = '';
    dom.taskInput.focus();
  });

  // Toggle or Delete task (using event delegation)
  dom.taskList.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const listItem = target.closest('.task-item');
    if (!listItem) return;

    const taskId = Number(listItem.getAttribute('data-id'));

    if (target.matches('.delete-btn, .delete-btn *')) {
      deleteTask(taskId);
    } else if (target.matches('.task-checkbox')) {
      toggleTask(taskId);
    }
  });
  
  // Change filter
  dom.filters.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const filterButton = target.closest('.filter-btn');
    if (filterButton) {
        currentFilter = filterButton.getAttribute('data-filter') as Filter;
        renderTasks();
    }
  });
  
  // Clear completed
  dom.clearCompletedBtn.addEventListener('click', clearCompletedTasks);
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  setupEventListeners();
  renderTasks();
});
