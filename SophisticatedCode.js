/* 
   Filename: SophisticatedCode.js
   Purpose: This code demonstrates a sophisticated and complex implementation of a task manager application
   Author: Your Name
   Date: Current Date
*/

class Task {
  constructor(id, name, description, priority) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.completed = false;
    this.createdAt = new Date();
  }

  complete() {
    this.completed = true;
  }

  display() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Description: ${this.description}`);
    console.log(`Priority: ${this.priority}`);
    console.log(`Created At: ${this.createdAt}`);
    console.log(`Completed: ${this.completed}`);
    console.log('--------------------------------');
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  addTask(name, description, priority) {
    const task = new Task(this.currentId, name, description, priority);
    this.tasks.push(task);
    this.currentId++;
  }

  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  completeTask(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.complete();
    }
  }

  displayTasks() {
    this.tasks.forEach((task) => {
      task.display();
    });
  }

  getPriorityTasks(priority) {
    const priorityTasks = this.tasks.filter((task) => task.priority === priority);
    console.log(`Priority (${priority}) Tasks:`);
    priorityTasks.forEach((task) => {
      task.display();
    });
  }
}

// Example usage
const taskManager = new TaskManager();

taskManager.addTask('Task 1', 'Description 1', 'High');
taskManager.addTask('Task 2', 'Description 2', 'Low');
taskManager.addTask('Task 3', 'Description 3', 'Medium');

taskManager.displayTasks();

taskManager.completeTask(2);
taskManager.deleteTask(1);

taskManager.displayTasks();

taskManager.getPriorityTasks('Low');