<template>
  <div class="edit-container">
    <Store class="logo-head" />
    <div class="edit-name">
      <div class="header-name">
        <Store />
        <p>Store</p>
      </div>
      <input class="name" placeholder="Store name" />
    </div>
    <div class="edit-address">
      <div class="header-address">
        <MapPin />
        <p>Address</p>
      </div>
      <input class="address" placeholder="Address" />
    </div>
  </div>
</template>

<script setup>
import { Store, MapPin } from "lucide-vue-next";
const props = defineProps(["store"]);
const store = [props.store];
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
  border-radius: 20px;
  border: 1px solid #3c3c3c;
  background: #242424;
}
.header-name,
.header-address {
  display: flex;
  align-items: center;
  gap: 8px;
}
.edit-name,
.edit-address {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
}
.name,
.address {
  display: flex;
  height: 40px;
  width: 100%;
  padding: 10px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid #3c3c3c;
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
