import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { isNotEmpty, sortByCreatedAt } from '@/services/utils';

export const useTaskStore = defineStore('task', () => {

  const task = ref([]);
  const getAllTask = () => {
    try {
      let sortedTask = sortByCreatedAt(task.value);
      return sortedTask;
    } catch (error) {
      return error
    }
  }
  const getTaskByCategory = (categoryId) => {
    try {
      let taskByCategory = task.value.filter(taskItem => taskItem.categoryId == categoryId)
      let sortedTask = sortByCreatedAt(taskByCategory);
      return sortedTask;
    } catch (error) {
      return error
    }
  }
  const addNewTask = (inputParam) => {
    try {
      let defaultParam = {
        id: uuidv4(),
        createdAt: moment().toISOString()
      }
      task.push({...defaultParam, ...inputParam});
    } catch (error) {
      return error;
    }
  }
  const updateTask = (taskId, inputParam) => {
    try {
      let selectedTask = task.value.find(taskItem => taskItem.id == taskId)
      if(!selectedTask) throw new Error("Task not found in database");
      
      Object.keys(inputParam).forEach(inputKey => {
        if(isNotEmpty(inputParam[inputKey])) selectedTask[inputKey] = inputParam[inputKey]
      })
      
    } catch (error) {
      return error;
    }
  }
  const deleteTask = (taskId) => {
    try {
      let selectedIndex = task.value.find(taskItem => taskItem.id == taskId);
      if(selectedIndex === -1) throw new Error("Task not found in database"); 
      task.value.splice(selectedIndex, 1);
    } catch (error) {
      return error;
    }
  };

  return {
    getAllTask,
    getTaskByCategory,
    addNewTask,
    updateTask,
    deleteTask
  }
}, {
  persist: {
    key: 'todoTask',
    storage: localStorage
  }
});