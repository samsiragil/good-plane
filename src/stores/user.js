import { defineStore } from 'pinia';
import { ref } from 'vue';

export const defineUserStore = defineStore('user', () => {
  const user = ref({
    name: ''
  })
  const getUser = () => user.value;
  const updateUser = (inputParam) => {
    try {
      Object.keys(inputParam).forEach(inputKey => {
        if(isNotEmpty(inputParam[inputKey])) user.value[inputKey] = inputParam[inputKey];
      })
    } catch (error) {
      return error;
    }
  };

  return {
    getUser,
    updateUser
  }
}, plugin)

const plugin = {
  persist: {
    key: 'todoUser',
    storage: localStorage
  }
}