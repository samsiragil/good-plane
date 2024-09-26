<template>
  <div class="bg-light p-5" style="min-height: 100vh;">
    <section class="d-flex align-items-center mb-5">
      <img src="../assets/images/logo.png" class="object-fit-cover rounded" height="50" width="50" />
      <div class="ps-3 w-100">
        <h4 class="font-medium mb-0">Good Plane</h4>
        <p class="font-regular text-secondary-emphasis text-14 mb-0">{{ userName }}</p>
      </div>
    </section> 
    <Category />
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import Category from './Category.vue';

const userStore = useUserStore()
const userName = computed(() => {
  return userStore.getUser().name ?? '-'
})

</script>