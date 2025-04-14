<template>
  <div class="edit-container">
    <Store class="logo-head" />
    
    <!-- Store Name Section -->
    <div class="edit-name">
      <div class="header-name">
        <Store />
        <p>Store</p>
      </div>
      <input
        class="name"
        placeholder="Store name"
        v-model="storeName"
    </div>
    
    <!-- Address Section -->
    <div class="edit-address">
      <div class="header-address">
        <MapPin />
        <p>Address</p>
      </div>
      <input
        class="address"
        placeholder="Address"
        v-model="storeAddress"
    </div>
    
    <!-- Save Button -->
     <div class="btn-container">
    <button class="save" v-on:click="handleSave">Save</button>
    <!-- <button class="cancel" v-on:click="handleCancel">Cancel</button> -->
  </div>
  </div>
</template>

<script setup>
import { Store, MapPin } from "lucide-vue-next";
import { ref } from "vue";
import { trpc } from "@/lib/trpc";

const props = defineProps(["store"]);

const storeName = ref(props.store.name);
const storeAddress = ref(props.store.address);

const handleSave = async () => {
  try {
    if (!storeName.value || !storeAddress.value) {
      alert("Store name or address is missing");
      return;
    }

    const response = await trpc.store.update.mutate({
      id: props.store.id,
      data: {
        name: storeName.value,
        address: storeAddress.value,
      },
    });
    alert("Save success");
  } catch (err) {
    console.error("Failed to update store:", err);
  }
};

const handleCancel = () => {
  window.history.back()
}
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
.btn-container{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
}
.save{
  background-color: white;
  color: black;
  border-radius: 6px;
  border: 1px solid #ffffff;
  width: 100px;
  height: 32px;
}
.cancel{
  color: white;
  border-radius: 6px;
  border: 1px solid #ffffff;
  width: 100px;
  height: 32px;
}

</style>
