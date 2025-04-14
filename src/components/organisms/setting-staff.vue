<template>
  <div class="edit-container">
    <ContactRound class="logo-head" />
    <div class="edit-owner">
      <div class="header-owner">
        <Crown />
        <p>Owner</p>
      </div>
      <p class="owner">{{ store.owner[0].name }}</p>
    </div>
    <div class="edit-admin">
      <div class="header-admin">
        <Users />
        <p>Admin</p>
      </div>
      <p class="admin">coming soon</p>
    </div>
  </div>
</template>

<script setup>
import { Crown, Users, ContactRound } from "lucide-vue-next";
const props = defineProps(["store"]);
const store = props.store;
</script>

<style scoped>
.logo-head {
  width: 36px;
  height: 36px;
}
.edit-container {
  display: flex;
  width: 100%;
  min-width: 300px;
  max-width: 440px;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.header-owner,
.header-admin {
  display: flex;
  align-items: center;
  gap: 8px;
}
.edit-owner,
.edit-admin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
}
.owner,
.admin {
  display: flex;
  height: 40px;
  width: 100%;
  padding: 10px;
  align-items: center;
  font-family: Onest;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
