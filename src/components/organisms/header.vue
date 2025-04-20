<template>
  <header>
    <a class="logo" href="/">
      <img :src="logo.src" alt="logo" width="40" />
      <h4>QUOT</h4>
    </a>

    <nav class="desktop-nav">
      <ul>
        <!-- <li>Product<ChevronDown /></li>
        <li>Team<ChevronDown /></li>
        <li>Pricing<ChevronDown /></li> -->
      </ul>

      <div class="desktop-theme-login">
        <Moon v-if="isDarkMode" @click="toggleTheme" />
        <Sun v-else @click="toggleTheme" />
        <template v-if="isLoggedIn">
          <div class="badge-wrapper" @click.stop="togglePopover">
            <span class="badge">{{ getInitials(userName) }}</span>
            <div v-if="showPopover" class="popover">
              <ul>
                <li @click="goToAccount">Account</li>
                <li @click="handleLogout">Logout</li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <Button @click="handleClick">Login</Button>
        </template>
      </div>
    </nav>
    <div class="mobile-nav">
      <!-- <Menu /> -->
      <template v-if="isLoggedIn">
        <div class="badge-wrapper" @click.stop="togglePopover">
          <span class="badge">{{ getInitials(userName) }}</span>
          <div v-if="showPopover" class="popover">
            <ul>
              <li @click="goToSettings">Account</li>
              <li @click="handleLogout">Logout</li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup>
import { Moon, Sun, ChevronDown, Menu } from "lucide-vue-next";
import { ref, onMounted, onBeforeUnmount } from "vue";
import Button from "@/components/atoms/button.vue";
import logo from "@/assets/quot.svg";
import VueCookies from "vue-cookies";
import { trpc } from "@/lib/trpc";

const isDarkMode = ref(false);
const isLoggedIn = ref(false);
const user = ref();
const userName = ref("");
const showPopover = ref(false);

function togglePopover() {
  showPopover.value = !showPopover.value;
}
function handleClick() {
  window.location.href = "/login";
}
function handleClickOutside(event) {
  const popoverElements = document.querySelectorAll(".badge-wrapper");
  let isInside = false;

  popoverElements.forEach((el) => {
    if (el.contains(event.target)) {
      isInside = true;
    }
  });

  if (!isInside) {
    showPopover.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function goToAccount() {
  showPopover.value = false;
  window.location.href = `/account`;
}

function handleLogout() {
  showPopover.value = false;
  isLoggedIn.value = false;
  VueCookies.remove("auth");
  window.location.href = "/";
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
}

onMounted(async () => {
  const raw = VueCookies.get("auth");
  const auth = typeof raw === "string" ? JSON.parse(raw) : raw;

  try {
    const fetchedUser = await trpc.user.getById.query(auth.userId);
    user.value = fetchedUser;
    userName.value = fetchedUser.name;
    isLoggedIn.value = true;
  } catch (err) {
    console.error("❌ Failed to fetch user:", err);
  }
});

function getInitials(name) {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
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
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

li {
  display: flex;
  align-items: center;
  gap: 2px;
}

.badge {
  display: flex;
  width: 38px;
  height: 38px;
  padding: 5px 4px;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid #707070;
  background: white;
  color: black;
  font-family: Onest;
  font-size: 16px;
}

.badge-wrapper {
  position: relative;
  cursor: pointer;
}

.popover {
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100px;
  z-index: 100;
}

.popover ul {
  list-style: none;
  gap: 0px;
}

.popover li {
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  width: 100%;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.popover li:hover {
  background: #f0f0f0;
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
    gap: 10px;
  }
}

@media screen and (min-width: 581px) {
  .mobile-nav {
    display: none;
  }
}
</style>
