<template>
  <!-- Trigger Button -->
  <div class="card" @click="togglePopover">
    <PlusIcon class="plus" />
  </div>

  <!-- Popover + Backdrop -->
  <transition name="fade">
    <div v-if="showPopover" class="edit-backdrop" @click.self="togglePopover">
      <div class="newstore-container">
        <Store class="logo-head" />
        <div class="edit-name">
          <div class="header-name">
            <Store />
            <p>Store</p>
          </div>
          <input
            class="name"
            @change="handleSetName"
            placeholder="Store name"
          />
        </div>
        <div class="edit-address">
          <div class="header-address">
            <MapPin />
            <p>Address</p>
          </div>
          <input
            class="address"
            @change="handleSetAddress"
            placeholder="Address"
          />
        </div>
        <div class="btn">
          <button class="save-btn" @click.self="handleSave">save</button>
          <button class="cancel-btn" @click.self="togglePopover">cancel</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon, Store, MapPin } from "lucide-vue-next";
import { trpc } from "@/lib/trpc";
const props = defineProps(["userId"]);
const userId = [props.userId];
const storeName = ref("");
const storeAddress = ref("");
const showPopover = ref(false);
const togglePopover = () => {
  showPopover.value = !showPopover.value;
};
const handleSetName = (event) => {
  storeName.value = event.target.value;
};
const handleSetAddress = (event) => {
  storeAddress.value = event.target.value;
};

const handleSave = async () => {
  if (storeName.value === "") {
    alert("Please enter a store name");
    return;
  }
  if (storeAddress.value === "") {
    alert("Please enter an address");
    return;
  }
  await trpc.store.create.mutate({
    name: storeName.value,
    address: storeAddress.value,
    ownerIds: userId,
    revenue: 0,
  });
  alert("Store created successfully");
  showPopover.value = false;
};
</script>

<style scoped>
/* Card trigger */
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
  cursor: pointer;
  transition: background 0.2s ease;
}

.card:hover {
  background: #707070;
}

.plus {
  width: 32px;
  height: 32px;
  color: white;
}

/* Popover backdrop */
.edit-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* มืดด้านหลัง */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

/* Popover container */
.newstore-container {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 300px;
  max-width: 440px;
  padding: 40px;
  background-color: #242424;
  border: 1px solid #3c3c3c;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
  z-index: 100;
}

.logo-head {
  width: 36px;
  height: 36px;
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
  background-color: #2c2c2c;
  color: white;
}

input::placeholder {
  color: #aaa;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
}
.save-btn {
  font-family: "Onest", sans-serif;
  display: flex;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: white;
  color: black;
  cursor: pointer;
}
.cancel-btn {
  font-family: "Onest", sans-serif;
  display: flex;
  flex-shrink: 1 0 0;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid white;
  cursor: pointer;
}
</style>
