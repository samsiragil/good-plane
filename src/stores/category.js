import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const useCategoryStore = defineStore('category', () => {
  
  const category = ref([]);
  const getCategories = () => category.value;
  const addNewCategory = (name) => {
    try {
      let newCategory = {
        id: uuidv4(),
        name: name,
        createdAt: moment().toISOString()
      };
      category.push(newCategory);
    } catch (error) {
      return error;
    }
  };
  const updateCategory = (categoryId, newName) => {
    try {
      let selectedCategory = category.value.find(categoryItem => categoryItem.id == categoryId);
      if(!selectedCategory) throw new Error("Category not found in database");
      selectedCategory.name = newName;
    } catch (error) {
      return error;
    }
  };
  const deleteCategory = (categoryId) => {
    try {
      let selectedIndex = category.value.find(categoryItem => categoryItem.id == categoryId);
      if(selectedIndex === -1) throw new Error("Category not found in database"); 
      category.value.splice(selectedIndex, 1);
    } catch (error) {
      return error;
    }
  };
  
  return {
    getCategories,
    addNewCategory,
    updateCategory,
    deleteCategory
  }
}, plugin);

const plugin = {
  persist: {
    key: 'todoCategory',
    storage: localStorage
  }
}