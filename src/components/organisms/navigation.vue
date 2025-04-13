<template>
  <div class="navbar">
    <nav class="navigation2">
      <a class="nav-btn" :href="`/home/${userId}`">
        <Home />
        <p>Home</p>
      </a>
      <a class="nav-btn" :href="`/store/${props.storeId}`">
        <Store />
        <p>Store</p>
      </a>
      <a class="nav-btn" :href="`/store/product/${props.storeId}`">
        <Archive />
        <p>Product</p>
      </a>
      <a class="nav-btn" :href="`/dashboard/${props.storeId}`">
        <ChartPie />
        <p>Dashboard</p>
      </a>
    </nav>
    <nav class="navigation1">
      <a class="nav-btn" :href="`/store/setting/${props.storeId}`">
        <Settings />
        <p>Setting</p>
      </a>
    </nav>
  </div>
</template>

<script setup>
import { Home, Archive, ChartPie, Settings, Store } from "lucide-vue-next";
import { defineProps, onMounted, ref } from "vue";
import VueCookies from "vue-cookies";
const props = defineProps(["storeId"]);
const userId = ref("");
onMounted(() => {
  const auth = VueCookies.get("auth");
  userId.value = auth.userId;
});
</script>

<style>
.navbar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.navigation1 {
  display: flex;
  padding: 14px 14px;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid #3c3c3c;
  background: #242424;
}

.navigation2 {
  display: flex;
  padding: 28px 14px;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid #3c3c3c;
  background: #242424;
}
@media (max-width: 563px) {
  .navigation1,
  .navigation2 {
    flex-direction: row;
    padding: 10px 10px;
  }
  .navbar {
    flex-direction: row;
  }
}

.nav-btn {
  display: flex;
  width: 62px;
  height: 62px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.nav-btn p {
  font-family: Onest;
  font-size: 12px;
}
</style>
