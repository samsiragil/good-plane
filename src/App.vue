<template>
  <BContainer fluid gutter-x="0">
    <BRow no-gutters>
      <BCol lg="3">
        <Sidebar />
      </BCol>
      <BCol lg="9">
        <RegisterUser />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import RegisterUser from './components/RegisterUser.vue';
</script>

