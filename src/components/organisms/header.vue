<template>
  <header>
    <a class="logo" href="/">
      <img src="/src/assets/quot.svg" alt="logo" width="40" />
      <h4>QUOT</h4>
    </a>
    <nav class="desktop-nav">
      <ul>
        <li>Product<ChevronDown /></li>
        <li>Team<ChevronDown /></li>
        <li>Pricing<ChevronDown /></li>
      </ul>
      <div class="desktop-theme-login">
        <Moon v-if="isDarkMode" @click="toggleTheme" />
        <Sun v-if="!isDarkMode" @click="toggleTheme" />
        <Button @click="handleClick">Login</Button>
      </div>
    </nav>
    <div class="mobile-nav">
      <Menu />
    </div>
  </header>
</template>

<script setup>
import { Moon, Sun, ChevronDown, Menu } from "lucide-vue-next";
import { ref } from "vue";
import Button from "@/components/atoms/button.vue";

const isDarkMode = ref(false);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
}

function handleClick() {
  window.location.href = "/login";
}
</script>

<style lang="css" scoped>
header {
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 2px solid #3c3c3c;
}
.logo {
  display: flex;
  display: flex;
  align-items: center;
  gap: 12px;
}
.desktop-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  flex: 1 0 0;
}
.desktop-theme-login {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
h4 {
  font-family: "Righteous";
  font-size: 24px;
  white-space: nowrap;
}
ul {
  display: flex;
  align-items: center;
  gap: 18px;
}
li {
  display: flex;
  align-items: center;
  gap: 2px;
}
@media screen and (max-width: 580px) {
  .desktop-nav,
  .desktop-theme-login {
    display: none;
  }
}
@media screen and (max-width: 580px) {
  .mobile-nav {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
  }
}

@media screen and (min-width: 581px) {
  .mobile-nav {
    display: none;
  }
}
</style>
