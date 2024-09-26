import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { generalDelay } from '@/services/utils';

export const useCategoryStore = defineStore('category', () => {
  
  const category = ref([]);
  const getCategories = () => category.value;
  const addNewCategory = async (name) => {
    try {
      await generalDelay()
      let newCategory = {
        id: uuidv4(),
        name: name,
        createdAt: moment().toISOString()
      };
      category.value.push(newCategory);
      return category.value;
    } catch (error) {
      return error;
    }
  };
  const updateCategory = async (categoryId, newName) => {
    try {
      await generalDelay()
      let selectedCategory = category.value.find(categoryItem => categoryItem.id == categoryId);
      if(!selectedCategory) throw new Error("Category not found in database");
      selectedCategory.name = newName;
      return category.value;
    } catch (error) {
      return error;
    }
  };
  const deleteCategory = async (categoryId) => {
    try {
      await generalDelay()
      let selectedIndex = category.value.findIndex(categoryItem => categoryItem.id == categoryId);
      console.log("🚀 ~ deleteCategory ~ selectedIndex:", selectedIndex)
      if(selectedIndex === -1) throw new Error("Category not found in database"); 
      category.value.splice(selectedIndex, 1);
    } catch (error) {
      return error;
    }
  };
  
  return {
    category,
    getCategories,
    addNewCategory,
    updateCategory,
    deleteCategory
  }
}, {
  persist: {
    key: 'good_plane',
    storage: localStorage
  }
});