<template>
  <div class="search-container">
    <Search />
    <input type="text" placeholder="Search..." class="search-input" />
  </div>
</template>

<script setup>
import { Search } from "lucide-vue-next";
</script>

<style scoped>
.search-container {
  display: flex;
  max-width: 380px;
  min-width: 300px;
  height: 40px;
  padding: 4px 20px;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid #3c3c3c;
  background: #242424;
}

.search-input {
  font-family: Onest, sans-serif;
  font-size: 12px;
  outline: none;
}
</style>
