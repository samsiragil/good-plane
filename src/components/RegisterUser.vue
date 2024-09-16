<template>
  <BModal 
    v-model="isShowModal" 
    hide-header
    hide-header-close
    hide-footer
    @hide.prevent>
    <div class="p-4">
      <template v-if="isSuccessUpdatedUserData">
        <div class="w-100 text-center">
          <h5 class="d-block">Welcome to Good Plane</h5>
          <h5>{{ userName }}</h5>
        </div>
      </template>
      <template v-else>
        <div class="w-100 mb-4">
          <label class="mb-2">Your name</label>
          <BFormInput 
            class="p-3"
            v-model="userName"
            size="md" 
            placeholder="Enter your name" />
        </div>
        <div class="text-center pb-4">
          <BButton 
            :disabled="userName == ''"
            :loading="isSavingUserData" 
            loading-fill
            variant="success" 
            @click="saveUserName()">Continue</BButton>
        </div>
      </template>
    </div>
  </BModal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { isNotEmpty } from '@/services/utils';

onMounted(() => {
  loadUserData()
})

const userStore = useUserStore(); 
const isShowModal = ref(false);
const loadUserData = async () => {
  try {
    let userData = userStore.getUser()
    if(!isNotEmpty(userData.name)) isShowModal.value = true; 
  } catch (error) {
    return error;
  }
}

const userName = ref('');
const isSavingUserData = ref(false);
const isSuccessUpdatedUserData = ref(false);
const saveUserName = async () => {
  try {
    isSavingUserData.value = true
    await userStore.updateUser({
      name: userName.value
    });
  } catch (error) {
    return error;
  } finally {
    isSavingUserData.value = false
    isSuccessUpdatedUserData.value = true
    setTimeout(() => {
      isShowModal.value = false
    }, 300);
  }
  
  
}
</script>