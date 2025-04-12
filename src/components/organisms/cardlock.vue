<template>
  <div class="card">
    <PlusIcon class="lock" />
  </div>
</template>

<script setup>
import { PlusIcon } from "lucide-vue-next";
</script>

<style scoped>
.card {
  display: flex;
  padding: 20px 34px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #707070;
  background: #434343;
  height: 253px;
}
.lock {
  width: 32px;
  height: 32px;
}
</style>
