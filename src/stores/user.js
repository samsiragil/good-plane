import { defineStore } from 'pinia';
import { ref } from 'vue';
import { generalDelay, isNotEmpty } from '@/services/utils';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: ''
  })
  const getUser = () => user.value;
  const updateUser = async (inputParam) => {
    try {
      Object.keys(inputParam).forEach(inputKey => {
        if(isNotEmpty(inputParam[inputKey])) user.value[inputKey] = inputParam[inputKey];
      })
      await generalDelay()
      return user.value;
    } catch (error) {
      return error;
    }
  };

  return {
    user,
    getUser,
    updateUser
  }
}, {
  persist: {
    key: 'todoUser',
    storage: localStorage
  }
})