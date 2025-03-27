<template>
  <nav class="navigation">
    <a class="nav-btn" href="/home/1">
      <Home />
      <p>Home</p>
    </a>
    <a class="nav-btn" href="/Item/1">
      <Archive />
      <p>Item</p>
    </a>
    <a class="nav-btn" href="/Dashboard/1">
      <ChartPie />
      <p>Dashboard</p>
    </a>
  </nav>
</template>

<script setup>
import { Home, Archive, ChartPie } from "lucide-vue-next";
</script>

<style>
.navigation {
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
